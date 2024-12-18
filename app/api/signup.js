import bcrypt from "bcrypt";
import { supabase } from "../../../lib/supabase"; // Ensure correct path to Supabase config

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    // Validate inputs
    if (!username || !email || !password) {
      return new Response(
        JSON.stringify({ error: "All fields are required." }),
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (fetchError) {
      console.error("Fetch error:", fetchError.message);
    }

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "Email already in use." }),
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const { data, error } = await supabase
      .from("users")
      .insert([{ username, email, password: hashedPassword }]);

    if (error) {
      throw new Error(error.message);
    }

    return new Response(
      JSON.stringify({ message: "User created successfully", data }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Server error:", error.message);
    return new Response(
      JSON.stringify({ error: "Internal Server Error", details: error.message }),
      { status: 500 }
    );
  }
}

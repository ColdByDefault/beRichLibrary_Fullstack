// This file is responsible for handling the POST request to sign up a new user.
// It uses the Supabase client to sign up the user with the provided email and password.
// If the sign-up is successful, it returns a success message and the user data. else it returns an error message.
// Supabase will send a verification email to the user's email address to verify the account.

import { supabase } from "../../../../lib/supabase";

export async function POST(req) {
  if (!supabase) {
    console.error("Supabase is not initialized.");
    return new Response(
      JSON.stringify({ error: "Supabase is not available during build." }),
      { status: 500 }
    );
  }

  try {
    const { email, password, username } = await req.json();
    console.log("Received data:", { email, password, username });

    // Sign up the user (this automatically interacts with the auth.users table)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username, // Add username as metadata
        },
      },
    });

    if (error) {
      console.error("SignUp Error:", error.message);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400 }
      );
    }

    // Extract the user's ID
    const user = data.user;

    if (!user) {
      console.error("SignUp Error: User object is null");
      return new Response(
        JSON.stringify({ error: "User creation failed" }),
        { status: 500 }
      );
    }

    // Insert user details into the profiles table
    const { error: profileError } = await supabase.from("profiles").insert({
      user_id: user.id, // Use the user's ID from auth.users
      username,
      email,
    });

    if (profileError) {
      console.error("Profiles Table Error:", profileError.message);
      return new Response(
        JSON.stringify({ error: "Error syncing profile data" }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ message: "User signed up successfully. Please verify your email." }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Auth error:", error.message);
    return new Response(
      JSON.stringify({ error: "Internal Server Error", details: error.message }),
      { status: 500 }
    );
  }
}



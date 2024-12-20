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
  
    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username, // Add username to metadata
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
  
    // Insert into profiles table
    const { user } = data;
    const { error: profileError } = await supabase.from("profiles").insert({
      user_id: user.id,
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
      JSON.stringify({ message: "User signed up successfully" }),
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



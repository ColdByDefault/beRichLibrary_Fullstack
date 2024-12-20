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
    const { email, password, username } = await req.json(); // Accept `username` in the request

    // Sign up the user and include metadata (username)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username, // Add username to raw_user_meta_data
        },
      },
    });

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400 } // Client-side error
      );
    }

    // Add an entry to the `profiles` table
    const { error: profileError } = await supabase
      .from("profiles") // Sync with the profiles table
      .insert({
        id: data.user.id, // Use the user ID from the auth table
        email,
        username,
      });

    if (profileError) {
      console.error("Error syncing with profiles:", profileError.message);
      return new Response(
        JSON.stringify({ error: "Error syncing profile data" }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ message: "User signed up successfully", data }),
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


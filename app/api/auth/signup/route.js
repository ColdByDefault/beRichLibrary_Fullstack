import  {supabase}  from "../../../../lib/supabase";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Supabase Auth handles encryption
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
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

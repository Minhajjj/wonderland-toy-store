import supabase from "@/lib/supabaseClient";

export async function signUpWithEmail(
  fullname: string,
  email: string,
  password: string
) {
  // 1. Create the user account in auth.users, passing the full name in metadata
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullname,
      },
    },
  });

  if (error) {
    return { error };
  }

  return { data };
}

export async function loginWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}

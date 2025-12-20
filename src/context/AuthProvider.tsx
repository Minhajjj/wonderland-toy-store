"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import supabase from "@/lib/supabaseClient";
import { getProfile } from "@/lib/getProfile";

type AuthContextType = {
  user: any | null;
  profile: any | null;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<any | null>(null);

  /**
   * Fetches the profile, and crucially, inserts a new profile if one does not exist.
   * This logic runs only after a user has a successful session (is authenticated).
   */
  const loadProfile = async (sessionUser: any) => {
    // 🟢 Retrieve the full name from the user_metadata stored in authActions.ts
    const userFullName = sessionUser?.user_metadata?.full_name || "New User";

    // 1. Check if a profile row already exists
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", sessionUser.id)
      .maybeSingle(); // Use maybeSingle to avoid errors if no row exists

    if (existingProfile) {
      // Profile exists, load full data
      const data = await getProfile(sessionUser.id);
      setProfile(data);
    } else {
      // 🟢 PROFILE DOES NOT EXIST: Insert the row using the retrieved name.
      // Use .upsert() to avoid primary key conflicts if the hook runs twice.
      const { error: insertError } = await supabase.from("profiles").upsert(
        {
          id: sessionUser.id,
          full_name: userFullName, // Use the name from the metadata!  
          email: sessionUser.email,
          role: "customer",
          created_at: new Date().toISOString(),
        },
        { onConflict: "id" } 
      ); 

      if (!insertError) {
        // Successfully inserted, now load the new profile
        const data = await getProfile(sessionUser.id);
        setProfile(data);
      } else {
        // The console error should be fixed by using upsert
        console.error("Profile creation error in AuthProvider:", insertError);
        setProfile(null);
      }
    }
  };

  useEffect(() => {
    // 1. Check for initial session when the app loads
    supabase.auth.getSession().then(async ({ data }) => {
      const sessionUser = data.session?.user ?? null;
      setUser(sessionUser);

      if (sessionUser) await loadProfile(sessionUser);
    });

    // 2. Set up listener for real-time auth state changes (login, logout, email confirmation)
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const sessionUser = session?.user ?? null;
        setUser(sessionUser);

        if (sessionUser) await loadProfile(sessionUser);
        else setProfile(null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const signOut = () => supabase.auth.signOut();

  return (
    <AuthContext.Provider value={{ user, profile, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export default AuthContext;

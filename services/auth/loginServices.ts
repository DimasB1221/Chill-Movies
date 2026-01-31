import { getSupabaseBroswerClient } from "@/lib/supabase/supabaseClient";
import { redirect } from "next/navigation";
import * as z from "zod";

interface RegisterServicesProps {
  email: string;
  password: string;
}

// Data yang di dapat dari useLogin di kirim ke sini
async function signInNewUser({ email, password }: RegisterServicesProps) {
  const supabase = getSupabaseBroswerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    console.log(error);
    return error;
  }
  redirect("/");
}

export default signInNewUser;

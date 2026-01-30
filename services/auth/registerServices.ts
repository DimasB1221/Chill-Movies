import { getSupabaseBroswerClient } from "@/lib/supabase/supabaseClient";
import { redirect } from "next/navigation";
import * as z from "zod";

interface RegisterServicesProps {
  email: string;
  password: string;
}

async function signUpNewUser({ email, password }: RegisterServicesProps) {
  const supabase = getSupabaseBroswerClient();
  const { error, data } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error) {
    console.log(error);
    return error;
  }
  console.log({ data });
}

export default signUpNewUser;

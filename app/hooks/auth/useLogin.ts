import signInNewUser from "@/services/auth/loginServices";

const handleSubmitLogin = (prevState: string, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!password || !email) {
    return "Error: Email atau kata sandi salah";
  }

  signInNewUser({ email, password });

  return "Error: Kesalahan terjadi silahkan ulangi";
};

export default handleSubmitLogin;

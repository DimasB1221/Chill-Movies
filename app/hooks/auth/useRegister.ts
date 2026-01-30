import signUpNewUser from "@/services/auth/registerServices";

const handleSubmitRegister = (prevState: string, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (password !== confirmPassword) {
    return "Error: Kata sandi tidak cocok";
  }

  signUpNewUser({ email, password });

  return "Error: Kesalahan terjadi silahkan ulangi";
};

export default handleSubmitRegister;

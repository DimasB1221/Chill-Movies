"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface CardRegisterLoginProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function CardRegisterLogin({ className, ...props }: CardRegisterLoginProps) {
  const pathname = usePathname();
  const isRegisterPage = pathname === "/register";
  const isLoginPage = pathname === "/login";

  // Conditional content based on pathname
  const content = {
    title: isRegisterPage ? "Daftar" : "Masuk",
    subtitle: isRegisterPage ? "Selamat datang!" : "Selamat datang kembali!",
    buttonText: isRegisterPage ? "Daftar" : "Masuk",
    footerText: isRegisterPage ? "Sudah punya akun?" : "Belum punya akun?",
    footerLinkText: isRegisterPage ? "Masuk" : "Daftar",
    footerLinkHref: isRegisterPage ? "/login" : "/register",
  };

  return (
    <section
      className={cn(
        "w-full sm:max-w-md rounded-2xl bg-gradient-to-b from-black/80 to-black/50 p-8 backdrop-blur-md border border-white/10 shadow-2xl relative",
        className,
      )}
      {...props}
    >
      {/* Logo */}
      <div className="flex items-center justify-center mb-5">
        <Image
          src="/Chill-Logo.png"
          alt="Logo"
          width={250}
          height={200}
          className="absolute top-0"
        />
      </div>

      {/* Title & Subtitle */}
      <div className="mb-8 text-center relative top-10">
        <h6 className=" font-semibold text-white md:text-[32px]">
          {content.title}
        </h6>
        <p className="mt-1  text-white/60">{content.subtitle}</p>
      </div>

      {/* Form */}
      <form className={`space-y-5 ${isLoginPage ? "mt-15" : "mt-0"}`}>
        {/* Username Input */}
        <Input
          type="text"
          label="Username"
          placeholder="Masukkan username"
          required
        />

        {/* Password Input */}
        <Input
          type="password"
          label="Kata Sandi"
          placeholder="Masukkan kata sandi"
          required
        />

        {/* Confirm Password Input - Only on Register */}
        {isRegisterPage && (
          <Input
            type="password"
            label="Konfirmasi Kata Sandi"
            placeholder="Masukkan kata sandi"
            required
          />
        )}

        {/* Footer Link */}
        <p className=" text-white/60 md:text-base">
          {content.footerText}{" "}
          <Link
            href={content.footerLinkHref}
            className="font-semibold text-white hover:underline"
          >
            {content.footerLinkText}
          </Link>
        </p>

        <Button type="submit" variant="primary" className="w-full">
          {content.buttonText}
        </Button>

        <div className="flex justify-center text-xs md:text-[14px]">
          <span className="bg-transparent px-2 text-white/40">Atau</span>
        </div>

        {/* Google OAuth Button */}
        <Button type="button" variant="google" className="w-full">
          <svg className="h-5 w-5" viewBox="0 0 48 48">
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            />
            <path fill="none" d="M0 0h48v48H0z" />
          </svg>
          Daftar dengan Google
        </Button>
      </form>
    </section>
  );
}

export default CardRegisterLogin;

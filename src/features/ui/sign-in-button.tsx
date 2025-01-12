"use client";

import { signIn } from "next-auth/react";
import { ButtonHTMLAttributes } from "react";

import { pageRoutes } from "@/shared/constants/page-routes";

export type SignInButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const SignInButton = (props: SignInButtonProps) => {
  const handleSignIn = async () => {
    await signIn("github", {
      callbackUrl: pageRoutes.home,
    });
  };

  return (
    <button className="btn btn-outline w-20" onClick={handleSignIn} {...props}>
      Log In
    </button>
  );
};

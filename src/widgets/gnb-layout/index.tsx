import { getServerSession } from "next-auth";
import Link from "next/link";
import { PropsWithChildren } from "react";

import { authOptions } from "@/app/api/next-auth";
import { SignInButton } from "@/features/ui/sign-in-button";
import { pageRoutes } from "@/shared/constants/page-routes";
import { LoggedInUser } from "./logged-in-user";

const GnbLaoyout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="flex items-center justify-center border-r border-zinc-900">
        <div className="flex h-24 w-full max-w-[1000px] items-center justify-between">
          <Link
            href={pageRoutes.home}
            className="text-2xl font-black tracking-tighter"
          >
            <span className="text-emerald-300">Dev</span>.shboard
          </Link>

          {session ? <LoggedInUser /> : <SignInButton />}
        </div>
      </div>

      {children}
    </>
  );
};

export default GnbLaoyout;

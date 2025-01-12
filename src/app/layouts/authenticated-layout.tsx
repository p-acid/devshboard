import { pageRoutes } from "@/shared/constants/page-routes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export const AuthenticatedLayout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession();

  if (!session) {
    redirect(pageRoutes.signIn);
  }

  return children;
};

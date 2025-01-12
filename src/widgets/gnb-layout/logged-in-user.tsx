import { getServerSession } from "next-auth";
import { HTMLAttributes } from "react";

import { authOptions } from "@/app/api/next-auth";

export type LoggedInUserProps = HTMLAttributes<HTMLDetailsElement>;

export const LoggedInUser = async (props: LoggedInUserProps) => {
  const session = await getServerSession(authOptions);

  return (
    <details className="dropdown" {...props}>
      <summary className="avatar cursor-pointer">
        <div className="size-10 rounded-full">
          {session?.user?.image ? (
            <img src={session?.user?.image} alt="유저 프로필 이미지" />
          ) : null}
        </div>
      </summary>

      <div className="dropdown-content right-[-12px] top-[calc(100%+8px)] z-[1] w-52 rounded-lg border border-zinc-800 bg-base-100 px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start gap-0">
            <p className="text-sm font-semibold text-zinc-50">
              {session?.user?.name}
            </p>
            <p className="text-xs text-zinc-500">{session?.user?.email}</p>
          </div>
        </div>
      </div>
    </details>
  );
};

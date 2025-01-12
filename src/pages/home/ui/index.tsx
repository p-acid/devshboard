"use client";

import { signOut } from "next-auth/react";

export const HomePage = () => {
  return (
    <main className="flex flex-col items-center gap-2">
      <button className="btn btn-neutral" onClick={() => signOut()}>
        Logout
      </button>
    </main>
  );
};

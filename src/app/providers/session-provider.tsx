"use client";

import {
  SessionProvider as NextAuthSessionProvider,
  SessionProviderProps,
} from "next-auth/react";

const SessionProvider = ({ children, ...rest }: SessionProviderProps) => {
  return (
    <NextAuthSessionProvider {...rest}>{children}</NextAuthSessionProvider>
  );
};

export default SessionProvider;

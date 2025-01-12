import type { Metadata } from "next";

import SessionProvider from "../providers/session-provider";

import GnbLayout from "@/widgets/gnb-layout";

import "../mocks/enable-server-mock";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Devshboard : 나의 개발자 프로필은 한 눈에 확인해보자",
  description: "개발자 프로필을 한 눈에 확인할 수 있는 대시보드 서비스",
};

export const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body className="antialiased">
        <SessionProvider>
          <GnbLayout>{children}</GnbLayout>
        </SessionProvider>
      </body>
    </html>
  );
};

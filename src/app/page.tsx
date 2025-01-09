import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex flex-col items-center gap-2">
      <header className="py-10">
        <h1 className="space-y-1 text-center font-bold tracking-tighter">
          <p className="text-emerald-500 text-xl">
            Next.js Test-Driven Development
          </p>
          <p className="text-3xl">완전 정복하기 프로젝트</p>
        </h1>
      </header>
      <Link href="/about">About</Link>
      <Link href="/mock/client">Client-Side Mocking</Link>
      <Link href="/mock/server">Server-Side Mocking</Link>
    </main>
  );
}

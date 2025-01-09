"use client";

import Link from "next/link";
import { useState } from "react";

import MswClientProvider from "@/shared/mocks/client/msw-client-provider";

const Contents = () => {
  const [contents, setContents] = useState([]);

  const fetchContents = async () => {
    const res = await fetch(`http://localhost:4000/contents`);
    const contents = await res.json();
    setContents(contents);
  };

  return (
    <div>
      <button onClick={fetchContents}>Fetch</button>

      {contents.map(
        (item: { id: string; title: string; description: string }) => (
          <div key={item.id}>
            <p>{item.id}</p>
            <p>{item.title}</p>
            <p>{item.description}</p>
          </div>
        )
      )}
    </div>
  );
};

const ClientSideMockPage = () => {
  return (
    <main>
      <h1>클라이언트 사이드 API Mocking 테스트</h1>

      <MswClientProvider>
        <Contents />
      </MswClientProvider>

      <Link href="/">Go Back</Link>
    </main>
  );
};

export default ClientSideMockPage;

import Link from "next/link";

const ServerSideMockPage = async () => {
  const res = await fetch("http://localhost:4000/contents");
  const contents = await res.json();

  return (
    <main>
      <h1>서버 사이드 API Mocking 테스트</h1>

      {contents.map(
        (item: { id: string; title: string; description: string }) => (
          <div key={item.id}>
            <p>{item.id}</p>
            <p>{item.title}</p>
            <p>{item.description}</p>
          </div>
        )
      )}

      <Link href="/">Go Back</Link>
    </main>
  );
};

export default ServerSideMockPage;

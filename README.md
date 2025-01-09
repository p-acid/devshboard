# Next.js로 진행하는 프론트엔드 TDD

## 환경설정

> [!TIP]
>
> 환경설정에 확장 프로그램은 **VSCode** 기준으로 작성되었습니다.

- 환경설정을 진행할 패키지는 다음과 같습니다.
  - 유닛 테스트를 진행하기 위해 활용될 라이브러리 `vitest`
  - E2E 테스트를 위한 `playwright`
  - API 모킹을 위한 `msw`
- 자세한 내용은 [환경설정 커밋](https://github.com/p-acid/nextjs-tdd/commit/5fe096c5b87c7f490072093dd5cfc714d595e971)을 참고해주세요.

1. 패키지 설치 및 초기 설정

> [!TIP]
>
> **Playwright 초기 설정 명령어 입력 전 참고사항**
>
> - Playwright 초기 설정을 진행하면서 E2E 테스트 파일들을 저장하는 폴더명 설정에서만 `__tests__` 로 폴더명을 변경해주시고, 나머지는 기본 값을 따르면 됩니다.

```sh
# vitest
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom vite-tsconfig-paths

# playwright
npm init playwright

# msw
npm install -D msw@latest
```

- 이후 `vitest` 초기 설정을 위해 루트 경로의 `vitest.config.mts` 파일을 참고하여 동일한 위치에 추가해주세요.

2. VSCode Extension 설치

- [VSCode Extension : Vitest](https://marketplace.visualstudio.com/items?itemName=vitest.explorer)
- [VSCode Extension : Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

3. 설치 완료를 위한 테스트 진행

> [!TIP]
>
> Playwright 테스트 실행 전 테스트 시나리오에 맞게 다음 추가 작업을 진행해주세요.
>
> - 루트 페이지 내 `"About"` 텍스트를 포함하는 버튼 요소 추가
> - `/about` 경로에 페이지를 하나 만들고, 해당 페이지 내 `h1` 태그 추가 및 텍스트로 `"About"` 추가

```ts
// vitest.spec.ts

import { describe, expect, test } from "vitest";

const addOne = (num: number): number => num + 1;

describe("Add One", () => {
  test("Add One", () => {
    const num = 1;
    const expected = 2;
    const result = addOne(num);
    expect(result).toEqual(expected);
  });
});

// /__tests__/example.spec.ts

import { expect, test } from "@playwright/test";

test("should navigate to the about page", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto("http://localhost:3000/");
  // Find an element with the text 'About' and click on it
  await page.click("text=About");
  // The new URL should be "/about" (baseURL is used there)
  await expect(page).toHaveURL("http://localhost:3000/about");
  // The new page should contain an h1 with "About"
  await expect(page.locator("h1")).toContainText("About");
});
```

### MSW 환경설정

MSW는 비교적 추가 작업이 많아 별도로 설명을 진행합니다.

> [!IMPORTANT]
>
> 앞에서 패키지 설치를 안했다면 `msw` 패키지 설치를 진행해주세요. 이하 과정은 패키지 설치가 진행되었다고 가정한 프로세스입니다.

MSW는 브라우저 환경과 노드 환경을 모킹하는 두 가지 모두를 지원한다. Next.js의 경우 각 모킹 환경은 아래와 같은 상황에 활용된다.

- **브라우저 환경(`setupWorker`)**: 클라이언트 사이드 실행 환경
- **노드 환경(`setupServer`)**: 서버 사이드, 테스트 코드 실행 환경

두 가지 모두 공통으로 핸들러를 정의하여 활용하기에 우선 핸들러 코드를 작성해준다.

```ts
// __tests__/mocks/handlers/contents.ts

import { http, HttpResponse } from "msw";

export const contentsHandlers = [
  http.get("http://localhost:4000/contents", () => {
    return HttpResponse.json([
      {
        id: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
        title: "Getting started",
        description: "Three steps to get started with Mock Service Worker.",
      },
    ]);
  }),
];
```

```ts
// __tests__/mocks/handlers/index.ts

import { contentsHandlers } from "./handlers/contents";

const mswHandlers = [...contentsHandlers];

export default mswHandlers;
```

해당 핸들러를 활용하여 모킹 함수를 작성한다.

```ts
// __tests__/mocks/mock-in-browser.ts
import { setupWorker } from "msw/browser";
import mswHandlers from ".";

export const mockInBrowser = setupWorker(...mswHandlers);
```

```ts
// __tests__/mocks/mock-server.ts

import { setupServer } from "msw/node";
import mswHandlers from ".";

export const mockServer = setupServer(...mswHandlers);
```

각각 다음의 파일을 통해 모킹 환경의 동작 프로세스를 확인할 수 있다.

- 테스트 코드
  - `playground/msw-spec.ts`
- 서버 사이드
  - `@/app/mock/server/page.tsx` (모킹된 환경에서 Fetching)
  - `@/app/layout.tsx` (서버 모킹 함수 실행)
- 클라이언트 사이드
  - `@/app/mock/client/page.tsx` (모킹된 환경에서 Fetching)
  - `@/shared/mocks/msw-wrapper.tsx` (모킹된 환경을 만드는 래퍼 컴포넌트)

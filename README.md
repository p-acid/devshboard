# Next.js로 진행하는 프론트엔드 TDD

## 환경설정

> [!TIP]
>
> 환경설정에 확장 프로그램은 **VSCode** 기준으로 작성되었습니다.

- 유닛 테스트를 진행하기 위해 활용될 라이브러리인 `vitest` 와 E2E 테스트를 위한 `playwright` 에 관련된 환경설정을 진행합니다.
- 자세한 내용은 환경설정 커밋을 참고해주세요.

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

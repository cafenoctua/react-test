# Testing tools
- Jest
  - テストランナー
- React testing library

# UnitTest
.test.jsでテスティングファイルを作れる
```
yarn test
```
でテストモードに移行できる

- HTML構造取得
```js
describe("Rendering", () => {
    it("Should render all the elements correctly", () => {
        render(<Render />);
        screen.debug();
    })
})
```
この様にかくとテスト対象のHTML構造をレンダリングできる


その他要素は下記gitのReadmeで参照できる
https://github.com/A11yance/aria-query

- 判定
expectが用いられる
```js
expect(screen.getByRole("heading")).toBeTruthy();
expect(screen.getByRole("textbox")).toBeTruthy();
expect(screen.getAllByRole("button")).toBeTruthy(); // getAllByRoleで全要素のテストが可能
expect(screen.getAllByRole("button")[0]).toBeTruthy(); // 一つ目のボタン取得
```
hタグが存在するか判定する

値の判定も可能
```js
expect(screen.getByText("Udemy")).toBeTruthy();
```
特定のテキストが入っているか判定できる

```js
screen.debug(screen.getByRole("heading"));
```
でhタグの要素を取得できる

値がいない場合を判定する
```js
expect(screen.queryByText("Udacity")).toBeNull();
expect(screen.queryByText(/I am/)).toBeNull // /**/で正規表現で値を判定できる
```

特定idの判定
```js
expect(screen.getByTestId("copyright")).toBeTruthy();
```

入力文が実際に入力されたか判定
```js
expect(inputValue.value).toBe("test");
```

値が同等か判定
```js
expect(frameworkItems).toEqual(dummyItems);
```

特定の文字列が存在するか判定
```js
expect(await screen.findByText(/I am/)).toBeInTheDocument();
```

判定文は下記をgit参照
https://github.com/testing-library/jest-dom

- Test名表示
packeage.jsonのscripts/testのvalueを以下の様に変更するとTest名が表示される様になる
```json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom --verbose",
    "eject": "react-scripts eject"
  },"test": "react-scripts test --env=jsdom --verbose"
```

- it
これは各テストケースを指す
一つのファイルにいくつも書いて良い
その際テストケース実行後に何かしらのデータが残っていると後続のテストケースに不具合が発生する可能性があるため以下のコードを先頭に宣言しておく必要がある
```js
afterEach(() => cleanup());
```

- userEvent
ユーザーの動作を再現できる機能
```js
userEvent.type(inputValue, "test");
```
これはユーザーがtestという入力をおこなうことを再現している

- Mock関数
jestで作成できる
ダミーのmock関数が呼び出されるかどうかのテストが行える
```js
const outputConsole = jest.fn();
```

- APIの挙動をMockする
mock service workerがreact-testing-toolでレコメンドされている
```
yarn add msw --save-dev
```
でインストールする

疑似サーバーを構築することでAPI呼び出しのテストを行える
```js
import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import UserEffectRender from "./UseEffectRender";

import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
    rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ username: "Bred dummy" }));
    })
);
```
serverが仮想のAPIサーバーの挙動をする

- Reduxのインテグレーションテスト
テスト用のReduxストアが必要となる

- CustomHooks
独自のフックスを作成できtesting-library/react-hooksでテストができる
```
yarn add @testing-library/react-hooks
yarn add react-test-renderer
```
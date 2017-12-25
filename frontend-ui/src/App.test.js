import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

// TODO -- actual tests
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

it("anonymous static works", () => {
  class Foo {
    static(x) {
      return x + 2;
    }
  }

  expect(Foo(3)).toEqual(5);
});

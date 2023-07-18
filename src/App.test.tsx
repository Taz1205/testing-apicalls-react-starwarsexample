import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "./App";

const server = setupServer(
  rest.get("https://swapi.dev/api/people/1/", (req, res, ctx) => {
    return res(ctx.json({ name: "Luke Skywalker" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders first person from the mock server", async () => {
  render(<App />);
  const nameElement = await screen.findByText(/Luke Skywalker/i);
  expect(nameElement).toBeInTheDocument();
});

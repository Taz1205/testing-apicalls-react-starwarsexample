import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "./App";
import StarWarsCharacter from "./components/StarWarsCharacter";

// Define success handler
const successHandler = rest.get(
  "https://swapi.dev/api/people/1/",
  (req, res, ctx) => {
    return res(ctx.json({ name: "Luke Skywalker" }));
  }
);

// Define error handler
const errorHandler = rest.get(
  "https://swapi.dev/api/people/1/",
  (req, res, ctx) => {
    return res(ctx.status(500));
  }
);

const server = setupServer(successHandler);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders first person from the mock server", async () => {
  server.use(successHandler); // Use success handler for this test
  render(<App />);
  const nameElement = await screen.findByText(/Luke Skywalker/i);
  expect(nameElement).toBeInTheDocument();
});

test("displays an error message if the API returns a 500 status code", async () => {
  server.use(errorHandler); // Use error handler for this test
  render(<StarWarsCharacter />);
  const errorMessage = await screen.findByText(
    "Oops... something went wrong, try again 🤕"
  );
  expect(errorMessage).toBeInTheDocument();
});

import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";

describe("App.js page structure", () => {
  test("should render app title", () => {
    const { getByText } = render(<App url={App} />);

    expect(getByText("Jed's Automated Test Runner V1")).toHaveTextContent(
      "Jed's Automated Test Runner V1"
    );
  });

  test("should render Reset button", () => {
    const { getByText } = render(<App />);

    expect(getByText("Reset Tests")).toBeInTheDocument();
    expect(getByText("Reset Tests")).toContainHTML("<span>Reset Tests</span>");
  });

  test("should render Run test button", () => {
    const { getByText } = render(<App />);

    expect(getByText("Run Tests")).toContainHTML("<span>Run Tests</span>");
    expect(getByText("Run Tests")).toBeInTheDocument();
  });

  test('should render "Amount of tests that have passed so far"', () => {
    const { getByText } = render(<App />);

    expect(
      getByText("Amount of tests that have passed so far:")
    ).toHaveTextContent("Amount of tests that have passed so far:");
  });

  test('should render "Amount of tests that have failed so far"', () => {
    const { getByText } = render(<App />);

    expect(
      getByText("Amount of tests that have failed so far:")
    ).toHaveTextContent("Amount of tests that have failed so far:");
  });

  test('should render "Amount of tests that are still running"', () => {
    const { getByText } = render(<App />);

    expect(
      getByText("Amount of tests that are still running:")
    ).toHaveTextContent("Amount of tests that are still running:");
  });

  test('should render "All test completed"', () => {
    const { getByText } = render(<App />);

    expect(getByText("All test completed:")).toHaveTextContent(
      "All test completed:"
    );
  });

  test("should render table with Index column", () => {
    const { getByText } = render(<App />);

    expect(getByText("Index")).toHaveTextContent("Index");
  });

  test("should render table with Description column", () => {
    const { getByText } = render(<App />);

    expect(getByText("Description")).toHaveTextContent("Description");
  });
  test("should render table with Status column", () => {
    const { getByText } = render(<App />);

    expect(getByText("Status")).toHaveTextContent("Status");
  });

  test("should render child table with Description column", () => {
    const { getByText } = render(<App />);

    expect(getByText("uploads go in both directions")).toHaveTextContent(
      "uploads go in both directions"
    );
  });

  test("should render child table with Status column", () => {
    const { getAllByText } = render(<App />);

    expect(getAllByText("NOT RUNNING")[0]).toHaveTextContent("NOT RUNNING");
  });

  test("should render table with child Index column and content 1", () => {
    const { getAllByText } = render(<App />);

    expect(getAllByText("1")[0]).toHaveTextContent("1");
  });
});

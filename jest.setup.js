// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

jest.mock("next/dynamic", () => () => {
  const DynamicComponent = () => null;
  DynamicComponent.displayName = "LoadableComponent";
  DynamicComponent.preload = jest.fn();
  return DynamicComponent;
});

jest.mock("next/router", () => require("next-router-mock"));

// Mock implementation of ResizeObserver
class ResizeObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {
    // Optionally, you can implement mock behavior for observe if needed
  }
  unobserve() {
    // Optionally, you can implement mock behavior for unobserve if needed
  }
  disconnect() {
    // Optionally, you can implement mock behavior for disconnect if needed
  }
}

// Assign the mock ResizeObserver to the global window object
global.ResizeObserver = ResizeObserver;

import { render, screen } from "@testing-library/react";

import SearchResultsMessage from "./ResultsMessage";

describe("SearchResultsMessage", () => {
  it("renders the correct message", () => {
    const label = "Results for <strong>“dog”</strong>";

    render(<SearchResultsMessage label={label} />);
    const message = screen.getByTestId("search-results-message-label");
    expect(message).toHaveTextContent("Results for “dog”");
  });

  it("renders with an icon", () => {
    const label = "Results for <strong>“cat”</strong>";
    const icon = <span>🔍</span>;

    render(<SearchResultsMessage label={label} icon={icon} />);
    const message = screen.getByTestId("search-results-message-label");
    expect(message).toHaveTextContent("Results for “cat”");
    expect(screen.getByText("🔍")).toBeInTheDocument();
  });

  it("applies text alignment styles", () => {
    const label = "Results for <strong>“bird”</strong>";

    render(<SearchResultsMessage label={label} textAlign="center" />);
    const message = screen.getByTestId("search-results-message");
    const childElement = message.firstChild as HTMLDivElement;
    expect(childElement).toHaveStyle("text-align: center");
  });
});

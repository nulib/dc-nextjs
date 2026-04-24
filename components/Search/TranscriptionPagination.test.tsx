import { render, screen } from "@/test-utils";

import TranscriptionPagination from "@/components/Search/TranscriptionPagination";
import userEvent from "@testing-library/user-event";

/* eslint sort-keys: 0 */
const pagination = {
  query_url:
    "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/search/file-sets?searchToken=N4IgRg9gJgniBcoDOBLAXgUwQFgAwBoQB9JCAVwC&page=4",
  current_page: 4,
  limit: 10,
  offset: 30,
  total_hits: 124,
  total_pages: 13,
  prev_url:
    "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/search/file-sets?searchToken=N4IgRg9gJgniB&page=3",
  next_url:
    "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/search/file-sets?searchToken=N4IgRg9gJgniBcoDOBLAXgUwQFgAwBoQ&page=5",
};

describe("TranscriptionPagination component", () => {
  it("renders default pagination styles with transcription result counts", () => {
    render(
      <TranscriptionPagination
        pagination={pagination}
        onPageChange={jest.fn()}
      />,
    );

    expect(screen.getByTestId("transcription-pagination"));
    expect(screen.getByTestId("results")).toHaveTextContent(
      "Showing 31 to 40 of 124 file set matches",
    );
    expect(screen.getByText(/start/i)).toBeInTheDocument();
    expect(screen.getByText(/previous/i)).toBeInTheDocument();
    expect(screen.getByText(/next/i)).toBeInTheDocument();
  });

  it("uses API pagination urls for previous and next navigation", async () => {
    const user = userEvent.setup();
    const onPageChange = jest.fn();

    render(
      <TranscriptionPagination
        pagination={pagination}
        onPageChange={onPageChange}
      />,
    );

    await user.click(screen.getByText(/previous/i));
    await user.click(screen.getByText(/next/i));

    expect(onPageChange).toHaveBeenNthCalledWith(1, pagination.prev_url);
    expect(onPageChange).toHaveBeenNthCalledWith(2, pagination.next_url);
  });

  it("constructs a first page url for start navigation", async () => {
    const user = userEvent.setup();
    const onPageChange = jest.fn();

    render(
      <TranscriptionPagination
        pagination={pagination}
        onPageChange={onPageChange}
      />,
    );

    await user.click(screen.getByText(/start/i));

    expect(onPageChange).toHaveBeenCalledWith(
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/search/file-sets?searchToken=N4IgRg9gJgniBcoDOBLAXgUwQFgAwBoQB9JCAVwC&page=1",
    );
  });
});

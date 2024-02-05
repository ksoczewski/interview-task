import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  mapPostsWithComments,
  isNearBottomOfPage,
  handleLoadingError,
} from "./../helpers";
import { posts, comments } from "./mocks";
import { showError } from "../../ts/ui";

vi.mock("../../ts/ui", () => ({
  showError: vi.fn(),
}));

describe("mapPostsWithComments", () => {
  it("should correctly map comments to their respective posts", () => {
    const mappedPosts = mapPostsWithComments(posts, comments);

    expect(mappedPosts).toEqual([
      { ...posts[0], comments: [comments[0]] },
      { ...posts[1], comments: [comments[1]] },
    ]);
  });

  it("should handle posts without comments", () => {
    const oneComment = [comments[1]];

    const mappedPosts = mapPostsWithComments(posts, oneComment);

    expect(mappedPosts).toEqual([
      { ...posts[0], comments: [] },
      { ...posts[1], comments: [oneComment[0]] },
    ]);
  });
});

describe("isNearBottomOfPage", () => {
  beforeEach(() => {
    Object.defineProperty(document.body, "offsetHeight", {
      configurable: true,
      value: 1800,
    });
  });

  it("should return true if near the bottom of the page", () => {
    window.innerHeight = 800;
    window.scrollY = 1000;

    expect(isNearBottomOfPage()).toBe(true);
  });

  it("should return false if not near the bottom of the page", () => {
    window.innerHeight = 800;
    window.scrollY = 100;

    expect(isNearBottomOfPage()).toBe(false);
  });
});

describe("handleLoadingError", () => {
  it("should call showError with the correct message", () => {
    handleLoadingError();
    expect(showError).toHaveBeenCalledWith(
      "Failed to download posts and comments. Please try again later."
    );
  });
});

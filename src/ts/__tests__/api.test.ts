import { describe, it, expect, beforeEach, vi } from "vitest";
import { fetchPostsAndComments } from "../api";
import { MOCK_API } from "../../utils/constants";
import { handleLoadingError } from "../../utils/helpers";
import {
  posts as mockPosts,
  comments as mockComments,
} from "../../utils/__tests__/mocks";

vi.mock("../../utils/helpers", () => ({
  handleLoadingError: vi.fn(),
}));

describe("fetchPostsAndComments", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should fetch posts and comments successfully", async () => {
    window.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        json: vi.fn().mockResolvedValue(mockPosts),
      })
      .mockResolvedValueOnce({
        json: vi.fn().mockResolvedValue(mockComments),
      });

    const result = await fetchPostsAndComments(0, 1);

    if (result) {
      const { posts, comments } = result;
      expect(posts).toEqual(mockPosts);
      expect(comments).toEqual(mockComments);
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenCalledWith(`${MOCK_API}/posts?_start=0&_limit=1`);
      expect(fetch).toHaveBeenCalledWith(`${MOCK_API}/comments?postId=1`);
    }
  });

  it("should handle error on fetch failure", async () => {
    window.fetch = vi.fn(() => Promise.reject(new Error("Fetch error")));

    await fetchPostsAndComments(0, 1);

    expect(handleLoadingError).toHaveBeenCalled();
  });
});

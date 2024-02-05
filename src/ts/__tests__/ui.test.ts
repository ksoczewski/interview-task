import { describe, it, expect, beforeEach } from "vitest";
import { updateUIWithPosts } from "../ui";
import { PostWithCommentsType } from "../types";
import { showError } from "../ui";

describe("updateUIWithPosts", () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="app"></div>`;
  });

  it("should append posts to the app element", () => {
    const postsWithComments: PostWithCommentsType[] = [
      {
        userId: 1,
        id: 1,
        title: "Test Post",
        body: "This is a test post",
        comments: [
          {
            postId: 1,
            id: 1,
            name: "Commenter",
            email: "commenter@example.com",
            body: "This is a comment",
          },
        ],
      },
    ];

    updateUIWithPosts(postsWithComments);

    const app = document.querySelector("#app");
    if (app) {
      expect(app.children.length).toBe(1);
      expect(app.querySelector(".post")).not.toBeNull();
      expect(app.querySelector(".comments-container")).not.toBeNull();
      expect(app.querySelector(".comment")).not.toBeNull();
      expect(app.querySelector("h2")!.textContent).toBe("Test Post");
      expect(app.querySelector("p")!.textContent).toBe("This is a test post");
      expect(app.querySelector(".comment")!.textContent).toBe(
        "This is a comment"
      );
    }
  });
});

describe("showError", () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="app"></div>`;
  });

  it("should display an error message inside the app element", () => {
    const errorMessage =
      "Failed to download posts and comments. Please try again later.";
    showError(errorMessage);

    const app = document.querySelector("#app");
    if (app) {
      expect(app.innerHTML).toContain(errorMessage);
      expect(app.querySelector(".error-message")).not.toBeNull();
      expect(app.querySelector("p")!.textContent).toBe(errorMessage);
    }
  });
});

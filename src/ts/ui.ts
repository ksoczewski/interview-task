import { PostWithCommentsType } from "./types";

export function updateUIWithPosts(postsWithComments: PostWithCommentsType[]) {
  const app = document.querySelector("#app");
  if (!app) {
    console.error("Element #app not found in document.");
    return;
  }

  postsWithComments.forEach((postWithComments) => {
    const postElement = createPostElement(postWithComments);
    app.appendChild(postElement);
  });
}

function createPostElement(postWithComments: PostWithCommentsType) {
  const postDiv = document.createElement("div");
  postDiv.classList.add("post");

  const postTitle = document.createElement("h2");
  postTitle.textContent = postWithComments.title;

  const postBody = document.createElement("p");
  postBody.textContent = postWithComments.body;

  postDiv.appendChild(postTitle);
  postDiv.appendChild(postBody);

  if (postWithComments.comments && postWithComments.comments.length > 0) {
    const commentsContainer = document.createElement("div");
    commentsContainer.classList.add("comments-container");
    postWithComments.comments.forEach((comment) => {
      const commentDiv = document.createElement("div");
      commentDiv.classList.add("comment");
      commentDiv.textContent = comment.body;
      commentsContainer.appendChild(commentDiv);
    });
    postDiv.appendChild(commentsContainer);
  }

  return postDiv;
}

export function showError(message: string) {
  const app = document.querySelector("#app");
  if (!app) {
    console.error("Element #app not found in document.");
    return;
  }

  const errorMessageHtml = `
    <div class="error-message">
      <p>${message}</p>
      <button onclick="window.location.reload()">Try again</button>
    </div>
  `;

  app.innerHTML = errorMessageHtml;
}

import { PostType, CommentType } from "./../ts/types";
import { showError } from "../ts/ui";
import { SCROLL_THRESHOLD } from "./constants";

export function mapPostsWithComments(
  posts: PostType[],
  comments: CommentType[]
) {
  return posts.map((post: PostType) => ({
    ...post,
    comments: comments.filter(
      (comment: CommentType) => comment.postId === post.id
    ),
  }));
}

export function isNearBottomOfPage() {
  return (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - SCROLL_THRESHOLD
  );
}

export function handleLoadingError() {
  showError("Failed to download posts and comments. Please try again later.");
}

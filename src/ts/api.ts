import { handleLoadingError } from "../utils/helpers";
import { PostType, CommentType } from "./types";
import { MOCK_API } from "../utils/constants";

export async function fetchPostsAndComments(start: number, limit: number) {
  try {
    const postsResponse = await fetch(
      `${MOCK_API}/posts?_start=${start}&_limit=${limit}`
    );
    const posts: PostType[] = await postsResponse.json();
    let comments: CommentType[] = [];
    if (posts.length) {
      const postIds = posts.map((post: PostType) => post.id);

      const commentsPromises = postIds.map((id: number) =>
        fetch(`${MOCK_API}/comments?postId=${id}`).then((response) =>
          response.json()
        )
      );
      const commentsArray = await Promise.all(commentsPromises);
      comments = commentsArray.flat();
    }

    return {
      posts,
      comments,
    };
  } catch (error) {
    console.error("Error fetching posts and comments:", error);
    handleLoadingError();
  }
}

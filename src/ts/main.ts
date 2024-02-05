import { fetchPostsAndComments } from "./api";
import { updateUIWithPosts } from "./ui";
import {
  mapPostsWithComments,
  isNearBottomOfPage,
  handleLoadingError,
} from "../utils/helpers";
import { POSTS_LIMIT } from "../utils/constants";

let start = 0;
let isFetching = false;
let allPostsLoaded = false;

async function loadPostsAndComments() {
  if (isFetching || allPostsLoaded) return;

  isFetching = true;
  try {
    const result = await fetchPostsAndComments(start, POSTS_LIMIT);
    if (result) {
      const { posts, comments } = result;
      if (posts.length) {
        const postsWithComments = mapPostsWithComments(posts, comments);
        updateUIWithPosts(postsWithComments);
        start += posts.length;
        if (posts.length < POSTS_LIMIT) {
          allPostsLoaded = true;
        }
      } else {
        allPostsLoaded = true;
      }
    } else {
      handleLoadingError();
    }
  } catch (error) {
    console.error("Error fetching posts and comments:", error);
    handleLoadingError();
  } finally {
    isFetching = false;
  }
}

function onScroll() {
  if (isNearBottomOfPage() && !isFetching && !allPostsLoaded) {
    loadPostsAndComments();
  }
}

window.addEventListener("scroll", onScroll);

loadPostsAndComments();

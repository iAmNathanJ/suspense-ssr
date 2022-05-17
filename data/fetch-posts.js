import { API_DELAY } from "../server/delays";

// any promise that resolves with data can be used
export async function fetchPosts() {
  // Simulate a delay caused by data fetching.
  await new Promise((res) => setTimeout(res, API_DELAY / 2))

  return 'Hello world';
}

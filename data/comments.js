import { API_DELAY } from "../server/delays";

// any promise that resolves with data can be used
export async function comments() {
  // Simulate a delay caused by data fetching.
  await new Promise((res) => setTimeout(res, API_DELAY))

  return fetch(
    'https://627d3efee5ac2c452affe291.mockapi.io/api/v1/comments',
    { headers: { accept: 'application/json' } }
  )
    .then(res => res.json())
    .then(data => data.items.map(item => item.comment))
}

export async function getData() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/albums/1/photos"
  );

  return res.json();
}

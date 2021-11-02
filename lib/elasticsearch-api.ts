const API_ENDPOINT = "https://jsonplaceholder.typicode.com/posts/";

export async function getData() {
  const res = await fetch(API_ENDPOINT);

  return res.json();
}

export async function getAllWorkIds() {
  const res = await fetch(API_ENDPOINT);
  const data = await res.json();
  return data.map((item: any) => ({
    params: {
      id: item.id.toString(),
    },
  }));
}

export async function getWorkData(id: string) {
  const res = await fetch(`${API_ENDPOINT}/${id}`);
  const data = await res.json();
  return data;
}

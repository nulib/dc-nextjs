const URL = "https://api.artic.edu/api/v1/artworks";
const DEFAULT_FIELDS = ["id", "title", "image_id"];

export function makeIIIFEndpoint(image_id: string) {
  return `https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`;
}

export interface Work {
  id: string;
  title: string;
  image_id: string;
}

export async function getData() {
  const res = await fetch(`${URL}?fields=id,title,image_id`);
  const data = await res.json();
  return data.data;
}

export async function getAllWorkIds() {
  const res = await fetch(`${URL}?fields=id,title,image_id`);
  const data = await res.json();
  return data.data.map((item: Work) => ({
    params: {
      id: item.id.toString(),
    },
  }));
}

export async function getWorkData(id: string) {
  const res = await fetch(`${URL}/${id}/?fields=${DEFAULT_FIELDS.join(",")}`);
  const data = await res.json();
  return data.data;
}

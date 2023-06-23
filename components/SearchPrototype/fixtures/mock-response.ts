import { ResponseCardProps } from "../components/Response/Card";

interface MockResponseShape {
  data: ResponseCardProps[];
  summary: string;
}

const mockResponse: MockResponseShape = {
  data: [
    {
      certainty: 0.998,
      id: "1",
      title: "Foo Bar",
      type: "Image",
    },
    {
      certainty: 0.962,
      id: "2",
      title: "Foo Baz",
      type: "Image",
    },
    {
      certainty: 0.841,
      id: "3",
      title: "Foo Qux",
      type: "Video",
    },
    {
      certainty: 0.801,
      id: "4",
      title: "Foo Quux",
      type: "Image",
    },
    {
      certainty: 0.57,
      id: "5",
      title: "Foo Corge",
      type: "Image",
    },
    {
      certainty: 0.535,
      id: "6",
      title: "Foo Grault",
      type: "Image",
    },
    {
      certainty: 0.519,
      id: "7",
      title: "Foo Garply",
      type: "Image",
    },
    {
      certainty: 0.502,
      id: "8",
      title: "Foo Waldo",
      type: "Image",
    },
    {
      certainty: 0.27,
      id: "9",
      title: "Foo Fred",
      type: "Image",
    },
    {
      certainty: 0.27,
      id: "10",
      title: "Foo Plugh",
      type: "Image",
    },
  ],
  summary:
    "This is a summary of the search results. Foo lipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor mauris eget. Foo lipsum dolor sit amet, consectetur adipiscing elit. Foo lipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor mauris eget:",
};

export default mockResponse;

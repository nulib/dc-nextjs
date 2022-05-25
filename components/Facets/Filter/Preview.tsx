import React from "react";
import { SearchShape } from "@/types/api/response";

interface PreviewProps {
  data: SearchShape[];
}

const Preview: React.FC<PreviewProps> = ({ data }) => {
  return (
    <div>
      <p>[Preview]</p>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.accession_number}</li>
        ))}
      </ul>
    </div>
  );
};

export default Preview;

import React, { useState } from "react";

interface ReadMoreProps {
  text: string;
  words?: number;
}

const ReadMore: React.FC<ReadMoreProps> = ({ text, words = 15 }) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  console.log("text", text);

  const array = text.split(" ");
  const fragment = array.slice(0, words).join(" ");

  return (
    <>
      {isReadMore ? fragment : text}
      {array.length > words && (
        <a onClick={toggleReadMore} className="read-or-hide">
          {isReadMore && "...read more"}
        </a>
      )}
    </>
  );
};

export default ReadMore;

import ContentLoader from "react-content-loader";
import React from "react";

const LoadingBox: React.FC = (props) => {
  return (
    <ContentLoader
      speed={2}
      width={400}
      height={460}
      viewBox="0 0 400 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="0" width="200" height="200" />
      <rect x="0" y="218" width="180" height="8" />
      <rect x="0" y="230" width="120" height="8" />
    </ContentLoader>
  );
};

export default LoadingBox;

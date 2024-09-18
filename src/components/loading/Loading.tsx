import React from "react";
import "./Loading.styles.css";

const Loading: React.FC = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner">
        <div data-testid="loading" className="charging-circle"></div>
      </div>
    </div>
  );
};

export default Loading;

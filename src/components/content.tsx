import Text from "./text";  // Importing the Text component
import Images from "./image";  // Importing the Images component

import React from "react";

// Content component that displays the Text and Images components side by side
const content: React.FC = () => {
  return (
    <div style={{ display: "flex", padding: "px", fontFamily: "Montserrat" }}>
      {/* Outer container that applies flexbox layout */}
      <div style={{ display: "flex" }}>
        {/* Text component */}
        <Text />
      </div>

      <div style={{ display: "flex" }}>
        {/* Images component */}
        <Images />
      </div>
    </div>
  );
};

// Exporting content component to be used in other parts of the application
export default content;

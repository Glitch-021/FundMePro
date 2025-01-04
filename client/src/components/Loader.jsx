import React from "react";

const Loader = () => (
  <div className=" flex items-center mt-0 bg-[#C12853] my-10 rounded-md w-full h-24 relative overflow-hidden">
    <iframe
      src="https://giphy.com/embed/26DMW5ezY0HyXDxiE"
      // src="https://giphy.com/embed/Ii3seJlOgcXqdkU5dY"
      style={{
        pointerEvents: "none",
      }}
      className="giphy-embed rounded-full object-cover w-full h-[250px] absolute "
    ></iframe>
  </div>
);

export default Loader;

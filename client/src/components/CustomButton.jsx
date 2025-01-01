import React from "react";

const CustomButton = ({ btnType, title, styles, handleClick }) => {
  return (
    <button
      type={btnType}
      className={`${styles} font-hubot font-semibold text-[16px] leading-5 text-gray-50 min-h-[52px] px-4 rounded-[10px]`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;

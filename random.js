import React from "react";
import useGif from "./usegif";

const Random = () => {
  const { gif, fetchGif } = useGif();

  return (
    <div className="container">
      <img width="300" src={gif} alt="Random Gif" />
      <button onClick={fetchGif}>Click for New Gif</button>
    </div>
  );
};


export default Random;
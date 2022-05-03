import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "RDDdDkB0RL2YUyGlt6yiNrql9ajty64k";
const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;

const useGif = (tag) => {
  const [gif, setGif] = useState("");

  const fetchGif = async (tag) => {
    const { data } = await axios.get(tag ? `${url}&tag=${tag}` : url); //promise

    const imageSrc = data.data.images.downsized_large.url;

    setGif(imageSrc);
  };

  //Component Did Mount
  useEffect(() => {
    fetchGif(tag);
  }, [tag]);

  return { gif, fetchGif };
};

export default useGif;

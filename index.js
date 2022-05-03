import { GiphyFetch } from "@giphy/js-fetch-api";
import { IGif } from "@giphy/js-types";
import { Carousel, Gif } from "@giphy/react-components";
import React, { useState } from "react";
import { useAsync } from "react-async-hook";
import { render } from "react-dom";
import ResizeObserver from "react-resize-observer";
import ReactGiphySearchbox from "react-giphy-searchbox";
import "./styles.css";
import { Rating } from "./filter.js";
import Random from "./random.js";
import {createRoot} from 'react-dom/client';
import FileHandlers from './FileHandlers'

const Input = (props) => (
  <input
    type="file"
    accept="image/*"
    name="img-loader-input"
    multiple
    {...props}
  />
)

const Upload = () => {
  const {
    files,
    pending,
    next,
    uploading,
    uploaded,
    status,
    onSubmit,
    onChange,
  } = FileHandlers()

  return (
    <div className="container">
      <form className="form" onSubmit={onSubmit}>
        {status === 'FILES_UPLOADED' && (
          <div className="success-container">
            <div>
              <h2>Success!</h2>
              <small>Your file has been uploaded.</small>
            </div>
          </div>
        )}
        {status === '!FILES_UPLOADED' && (
          <div className="failure-container">
            <div>
              <h2>Failure!</h2>
              <small>Your file has not been uploaded.</small>
            </div>
          </div>
        )}
        <div>
          <Input onChange={onChange} />
          <button type="submit">Submit</button>
        </div>
        <div>
          {files.map(({ file, src, id }, index) => (
            <div
              style={{
                opacity: uploaded[id] ? 0.2 : 1,
              }}
              key={`thumb${index}`}
              className="thumbnail-wrapper"
            >
              <img className="thumbnail" src={src} alt="" />
              <div className="thumbnail-caption">{file.name}</div>
            </div>
          ))}
        </div>
      </form>
    </div>
  )
}

const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");

function CarouselDemo() {
  const fetchGifs = (offset: number) =>
    giphyFetch.search("dogs", { offset, limit: 10 });
  return <Carousel fetchGifs={fetchGifs} gifHeight={200} gutter={6} />;
}

function App() {
  const [modalGif, setModalGif] = useState();
  return (
    <>
      <img src={require("./logo.gif")} width="200" alt="Powered by GIPHY" />
      <p>Created by Wanyoung Kim</p>
      <h4>Trending</h4>
      <CarouselDemo />
      <h4>Search</h4>
      <Rating />
      <ReactGiphySearchbox
        apiKey="RDDdDkB0RL2YUyGlt6yiNrql9ajty64k"
        onSelect={(gif, e) => {
          console.log("gif", gif);
          setModalGif(gif);
        }}
        masonryConfig={[
          { columns: 2, imageWidth: 200, gutter: 5 },
          { mq: "700px", columns: 3, imageWidth: 120, gutter: 5 }
        ]}
        rating="G"
      />
      <h4>Random GIF</h4>
      <Random />
      <h4>Upload GIF</h4>
      <Upload />
      {modalGif && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0, 0, 0, .8)"
          }}
          onClick={(e) => {
            e.preventDefault();
            setModalGif(undefined);
          }}
        >
          <Gif gif={modalGif} width={400} />
        </div>
      )}
    </>
  );
}

export default Upload;
const rootElement = document.getElementById("root");
render(<App />, rootElement);

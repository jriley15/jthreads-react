import React, { useRef, useState, useEffect } from "react";
import "../assets/jthreads.css";

export default function Thread({ namespaceId, threadId, backgroundColor }) {
  const [height, setHeight] = useState(500);
  const iframe = useRef();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const handleMessage = ({ data, origin }) => {
      if (data.height) {
        setHeight(data.height);
      } else if (data === "ready") {
        setReady(true);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {};
  }, []);

  return (
    <>
      {!ready && (
        <div className="jthreads-container">
          <div className="j-threads-loader">Loading...</div>
        </div>
      )}
      <iframe
        title="JThreads"
        src={`https://devjthreads.jrdn.tech/?namespaceId=${namespaceId}&threadId=${threadId}&backgroundColor=${
          backgroundColor || "FFF"
        }`}
        width="100%"
        allowTransparency="true"
        frameBorder="0"
        ref={iframe}
        scrolling="no"
        style={{
          overflow: "hidden",
          height: height,
          display: ready ? "block" : "none",
        }}
      />
    </>
  );
}

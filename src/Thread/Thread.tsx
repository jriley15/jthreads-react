import React, { useRef, useState, useEffect } from "react";
import "./Thread.scss";
import { ThreadProps } from "./Thread.types";

const Thread: React.FC<ThreadProps> = ({
  namespaceId,
  threadId,
  backgroundColor,
}) => {
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
    <React.Fragment>
      {!ready && (
        <div className="jthreads-container">
          <div className="loader" />
        </div>
      )}
      <iframe
        title="JThreads"
        src={`https://devjthreads.jrdn.tech/?namespaceId=${namespaceId}&threadId=${threadId}&backgroundColor=${
          backgroundColor || "FFF"
        }`}
        width="100%"
        allowTransparency={true}
        frameBorder="0"
        ref={iframe}
        scrolling="no"
        style={{
          overflow: "hidden",
          height: height,
          display: ready ? "block" : "none",
        }}
      />
    </React.Fragment>
  );
};

export default Thread;

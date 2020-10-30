import React, { useRef, useState, useEffect } from "react";
import "./Thread.scss";
import { ThreadProps } from "./Thread.types";

const Thread: React.FC<ThreadProps> = ({
  namespaceId,
  threadId,
  backgroundColor,
}) => {
  const [height, setHeight] = useState(500);
  const iframe = useRef<HTMLIFrameElement>();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const handleMessage = ({ data, origin }) => {
      if (data.height) {
        setHeight(data.height);
      } else if (data === "ready") {
        setReady(true);
        iframe.current.contentWindow.postMessage(
          { href: window.location.href },
          "*"
        );
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <React.Fragment>
      {!ready && (
        <div className="jthreads-container">
          <div
            className="MuiCircularProgress-root MuiCircularProgress-colorPrimary MuiCircularProgress-indeterminate"
            role="progressbar"
            style={{ width: "40px", height: "40px;" }}
          >
            <svg className="MuiCircularProgress-svg" viewBox="22 22 44 44">
              <circle
                className="MuiCircularProgress-circle MuiCircularProgress-circleIndeterminate"
                cx="44"
                cy="44"
                r="20.2"
                fill="none"
                stroke-width="3.6"
              ></circle>
            </svg>
          </div>
        </div>
      )}
      <iframe
        title="JThreads"
        src={`https://jthreads-ssr.jrdn.tech/?namespaceId=${namespaceId}&threadId=${threadId}&backgroundColor=${
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

import React, { useEffect, useRef, useState } from "react";

export default function Thread({ namespaceId, threadId }) {
  const [height, setHeight] = useState(500);
  const iframe = useRef();

  useEffect(() => {
    const handler = event => {
      if (event.data.height) setHeight(event.data.height + 16);
    };

    window.addEventListener("message", handler);

    return () => {
      window.removeEventListener("message", handler);
    };
  }, []);

  useEffect(() => {
    iframe.current.contentWindow.postMessage(
      { outerHeight: window.top.outerHeight },
      "*"
    );
    iframe.current.contentWindow.postMessage(
      { outerWidth: window.top.outerWidth },
      "*"
    );
    iframe.current.contentWindow.postMessage(
      { screenY: window.top.screenY },
      "*"
    );
    iframe.current.contentWindow.postMessage(
      { screenX: window.top.screenX },
      "*"
    );
  }, [iframe.current]);

  return (
    <iframe
      title="JThreads"
      src={`https://embed.jrdn.tech/?namespaceId=${namespaceId}&threadId=${threadId}`}
      width="100%"
      allowTransparency="true"
      frameBorder="0"
      ref={iframe}
      scrolling="no"
      style={{
        overflow: "hidden",
        height: height
      }}
    />
  );
}

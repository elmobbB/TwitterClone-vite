import React from "react";
import { useEffect, useRef, useState, useCallback } from "react";

const ScrollContainer = ({ children, scrollCta }: any) => {
  const outerDiv = useRef<HTMLDivElement>(document.createElement("div"));
  const innerDiv = useRef<HTMLDivElement>(document.createElement("div"));

  const prevInnerDivHeight = useRef(0);

  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const outerDivHeight = outerDiv.current.clientHeight;
    const innerDivHeight = innerDiv.current.clientHeight;
    const outerDivScrollTop = outerDiv.current.scrollTop;

    if (
      !prevInnerDivHeight.current ||
      outerDivScrollTop === prevInnerDivHeight.current - outerDivHeight
    ) {
      outerDiv.current.scrollTo({
        top: innerDivHeight! - outerDivHeight!,
        left: 0,
        behavior: prevInnerDivHeight.current ? "smooth" : "auto",
      });
    } else {
      setShowScrollButton(true);
    }

    prevInnerDivHeight.current = innerDivHeight;
  }, [children]);

  const handleScrollButtonClick = useCallback(() => {
    const outerDivHeight = outerDiv.current.clientHeight;
    const innerDivHeight = innerDiv.current.clientHeight;

    outerDiv.current.scrollTo({
      top: innerDivHeight! - outerDivHeight!,
      left: 0,
      behavior: "smooth",
    });

    setShowScrollButton(false);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
      }}
    >
      <div
        ref={outerDiv}
        style={{
          position: "relative",
          height: "100%",
          overflow: "scroll",
        }}
      >
        <div
          ref={innerDiv}
          style={{
            position: "relative",
          }}
        >
          {children}
        </div>
      </div>
      <button
        style={{
          transform: "translateX(-50%)",
          opacity: showScrollButton ? 1 : 0,
          pointerEvents: showScrollButton ? "auto" : "none",
        }}
        className="absolute bg-red-500 text-white bottom-1 left-1/2 w-28 rounded-lg text-sm transition-all duration-300"
        onClick={handleScrollButtonClick}
      >
        {scrollCta}
      </button>
    </div>
  );
};

export default ScrollContainer;

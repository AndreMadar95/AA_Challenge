import { useEffect, useState } from "react";

export function useResizeObserver() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const observer = new ResizeObserver(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  });
  useEffect(() => {
    observer.observe(document.getElementsByTagName("body")[0]);
    return () => {
      observer.disconnect();
    };
  }, []);

  return { width: dimensions.width, height: dimensions.height };
}
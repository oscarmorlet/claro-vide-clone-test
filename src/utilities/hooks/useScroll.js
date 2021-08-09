import React, { useEffect, useState } from "react";

export const useScroll = () => {
  const [scrollY, setScrollY] = useState(getScrollY);

  useEffect(() => {
    const handleScrollY = () => setScrollY(getScrollY);
    window.addEventListener("scroll", handleScrollY);
    return () => window.removeEventListener("scroll", handleScrollY);
  }, []);

  return { scrollY };
};

const getScrollY = () => {
  const { scrollY } = window;
  return scrollY;
};

import React from "react";



export const useResize = (myRef : React.RefObject<HTMLTextAreaElement | null>): {width: number, height: number} => {
  const [width, setWidth] = React.useState<number>(0);
  const [height, setHeight] = React.useState<number>(0);

  const handleResize = () => {
    myRef && myRef.current && setWidth(myRef.current.offsetWidth);
    myRef && myRef.current && setHeight(myRef.current.offsetHeight);
  };

  React.useEffect(() => {
    myRef && myRef.current && myRef.current.addEventListener("resize", handleResize);

    return () => {
      myRef && myRef.current && myRef.current.removeEventListener("resize", handleResize);
    };
  }, [myRef]);

  return { width, height };
};

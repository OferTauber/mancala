import { useState, useEffect } from 'react';

const Bean = ({ width, higet }) => {
  const [colorNum, setColorNum] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);

  useEffect(() => {
    setColorNum(1 + Math.floor(Math.random() * 6) + '');
    setOffsetY(Math.random() * higet);
    setOffsetX(Math.random() * width);
  }, [width, higet]);
  Math.floor(Math.random * 6);
  return (
    <div
      className={`bean bean${colorNum}`}
      style={{ top: `${offsetY}vw`, right: `${offsetX}vw` }}
    ></div>
  );
};

export default Bean;

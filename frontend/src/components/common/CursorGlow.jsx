import {
  useEffect,
  useState,
} from "react";

const CursorGlow = () => {
  const [position, setPosition] =
    useState({
      x: 0,
      y: 0,
    });

  useEffect(() => {
    const updateMouse = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener(
      "mousemove",
      updateMouse
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        updateMouse
      );
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-[1] hidden lg:block"
      style={{
        left: position.x - 150,
        top: position.y - 150,
      }}
    >
      
      <div className="w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[120px]" />
    </div>
  );
};

export default CursorGlow;
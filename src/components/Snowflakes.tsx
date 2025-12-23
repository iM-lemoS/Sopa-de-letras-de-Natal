import { useEffect, useState } from "react";

interface Snowflake {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const Snowflakes = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 8 + 4,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.6 + 0.4,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className={flake.id % 2 === 0 ? "animate-snowfall" : "animate-snowfall-slow"}
          style={{
            position: "absolute",
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            backgroundColor: "white",
            borderRadius: "50%",
            opacity: flake.opacity,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
          }}
        />
      ))}
    </div>
  );
};

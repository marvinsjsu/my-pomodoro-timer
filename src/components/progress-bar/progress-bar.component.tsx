import { FC, ReactNode } from "react";

import "./progress-bar.modules.css";

type TProgressBarProps = {
  value: number;
  targetValue: number;
  children?: ReactNode;
  color?: string;
};

const ProgressBar:FC<TProgressBarProps> = ({ value, targetValue, children, color="#fb8500" }) => {
  const progression = ((targetValue - value) / targetValue) * 360;
  const background = `conic-gradient(${color}, ${progression}deg, #ededed 0deg)`;
  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar-circle"
        style={{ background }}
      >
        <div className="progress-bar-circle-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;

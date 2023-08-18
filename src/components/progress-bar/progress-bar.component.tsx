import { FC, ReactNode } from "react";

import "./progress-bar.modules.css";

type TProgressBarProps = {
  value: number;
  targetValue: number;
  children?: ReactNode;
};

const ProgressBar:FC<TProgressBarProps> = ({ value, targetValue, children }) => {
  const progression = ((targetValue - value) / targetValue) * 360;
  const background = `conic-gradient(#fb8500, ${progression}deg, #ededed 0deg)`;
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

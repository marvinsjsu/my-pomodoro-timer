
import MyPomodoroTimer from "./components/my-pomodoro-timer/my-pomodoro-timer.component";

import useCachedData from "./hooks/useCachedData";

import "./App.modules.css";

function App() {
  const [ isLoadingDone, focusItems ] = useCachedData();
  return (
    <div className="app-container">
      {isLoadingDone
        ? <MyPomodoroTimer initialFocusItems={focusItems} />
        : <p>Loading data...</p>
      }
    </div>
  );
}

export default App;

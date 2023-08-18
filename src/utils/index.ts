
export function secondsToMinutes(sec: number): [string, number, number] {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  const formattedArr = [];
  const connector = "and";

  let minutesText = (minutes === 0)
    ? ''
    : (minutes > 1)
      ? `${minutes} mins`
      : `${minutes} min`;

  let secondsText = (seconds === 0)
    ? ''
    : (seconds > 1)
      ? `${seconds} secs`
      : `${seconds} sec`;

  formattedArr.push(minutesText);

  if (minutes > 0 && seconds > 0) {
    formattedArr.push(connector);
  }

  formattedArr.push(secondsText);

  return [formattedArr.join(" "), minutes, seconds];
}

export const countdownDisplay = (count: number) => {
  const [_timeStr, mins, secs] = secondsToMinutes(count);
  const minsDisplay = mins === 0 ? "00" : (mins < 10) ? `0${mins}` : mins;
  const secsDisplay = secs < 10 ? `0${secs}` : secs;
  const timeDisplay = `${minsDisplay}:${secsDisplay}`;
  return count === -1 ? "00:00" : timeDisplay;
};

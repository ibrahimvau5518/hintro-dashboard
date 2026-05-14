export const formatSecondsToTime = (totalSeconds) => {
  if (!totalSeconds || isNaN(totalSeconds)) return '0m 0s';
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return minutes + 'm ' + seconds + 's';
};

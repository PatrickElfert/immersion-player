export function timecodeToSeconds(timecode: string) {
  const [hours, minutes, secondsWithMs] = timecode.split(":");
  const [seconds, milliseconds] = secondsWithMs.split(",");

  const totalSeconds =
    Number(hours) * 3600 +
    Number(minutes) * 60 +
    Number(seconds) +
    Number(milliseconds) / 1000;

  return totalSeconds;
}

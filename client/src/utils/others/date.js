export function checkHowManyDaysAgo(first, second) {
  if ((second - first) / (1000 * 60) < 1) {
    return `${Math.round((second - first) / 1000)}s`;
  } else if ((second - first) / (1000 * 60 * 60) < 1) {
    return `${Math.round((second - first) / (1000 * 60))}m`;
  } else if ((second - first) / (1000 * 60 * 60 * 24) < 1) {
    return `${Math.round((second - first) / (1000 * 60 * 60))}h`;
  } else if ((second - first) / (1000 * 60 * 60 * 24 * 31) < 1) {
    return `${Math.round((second - first) / (1000 * 60 * 60 * 24))}d`;
  } else if ((second - first) / (1000 * 60 * 60 * 24 * 31 * 12) < 1) {
    return formatDate(first);
  } else if ((second - first) / (1000 * 60 * 60 * 24 * 31 * 12) > 1) {
    return formatDate(first);
  }
}

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/");
}

export function countTimeLeft(start, time_limit) {
  const end = new Date(start + time_limit * 6000);
  const current = new Date();

  const minutes = parseInt(
    time_limit - Math.abs(end.getTime() - current.getTime()) / (1000 * 60)
  );
  const seconds = parseInt(
    60 - ((Math.abs(end.getTime() - current.getTime()) / 1000) % 60)
  );

  return (
    <>
      {!isNaN(minutes) && (
        <>
          {minutes > 0 || seconds > 0 ? (
            <>{`${minutes}:${seconds < 10 ? 0 : ""}${seconds}`}</>
          ) : (
            <>FINISHED</>
          )}
        </>
      )}
    </>
  );
}

export function countDownTimer(start, timeleft) {
  const countDownDate = new Date(
    new Date(start).getTime() + timeleft * 60000
  ).getTime();

  // Get todays date and time
  let now = new Date().getTime();

  // Find the distance between now an the count down date
  let distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60 * 1)) / (1000 * 60)); /// (1000 * 60)
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="demo"
  return (
    <>
      {!isNaN(minutes) && (
        <>
          {hours > 0 || minutes > 0 || seconds > 0 ? (
            <>{`${hours}:${minutes < 10 ? 0 : ""}${minutes}:${
              seconds < 10 ? 0 : ""
            }${seconds}`}</>
          ) : (
            <>FINISHED</>
          )}
        </>
      )}
    </>
  );
}

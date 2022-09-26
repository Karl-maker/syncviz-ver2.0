import { Chip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { countDownTimer } from "../../utils/others/date";

export default function Timer(props) {
  const { on, start, timeLeft } = props;
  const [showTimer, setShowTimer] = useState(true);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(countDownTimer(start, timeLeft));
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Chip
      onClick={() => {
        setShowTimer((showTimer) => !showTimer);
      }}
      label={
        <Typography
          variant="overline"
          sx={{
            borderColor: "text.primary",
            color: "#ffff",
            fontSize: "10px",
            fontWeight: "bold",
          }}
        >
          <>
            {showTimer && timer ? (
              <>{timer}</>
            ) : (
              <>{on ? "LIVE" : "DISCONNECTED"}</>
            )}
          </>
        </Typography>
      }
      size="small"
      sx={{
        fontSize: "10px",
        bgcolor: on ? "#d63031" : "",
        marginRight: "5px",
      }}
    />
  );
}

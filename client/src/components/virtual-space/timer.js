import { useEffect, useState, useContext } from "react";
import { VirtualSpaceContext } from "../../widgets/virtual-space";
import { Chip, Skeleton, Typography } from "@mui/material";
import { countDownTimer } from "../../utils/others/date";
import { MdTimerOff } from "react-icons/md";
import classes from "../../utils/constants/classes";

export default function Timer(props) {
  const { on } = props;
  const { virtualSpace } = useContext(VirtualSpaceContext);
  const [showTime, setShowTime] = useState(true);
  const [time, setTime] = useState(
    <Skeleton animation="wave" variant="circular" width={10} height={10} />
  );

  useEffect(() => {
    setInterval(function () {
      setTime(
        countDownTimer(
          new Date(virtualSpace.createdAt),
          virtualSpace.time_limit
        )
      );
    }, 1000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Chip
      className={classes.VIEWER_TIMER}
      icon={
        <Chip
          onClick={() => {
            setShowTime((show) => !show);
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
              <>{on ? "LIVE" : "DISCONNECTED"}</>
            </Typography>
          }
          size="small"
          sx={{ fontSize: "10px", bgcolor: on ? "#d63031" : "" }}
        />
      }
      label={
        (
          <Typography sx={{ fontSize: "10px" }}>
            {showTime ? (
              on ? (
                time
              ) : (
                <MdTimerOff style={{ marginTop: "3px", fontSize: "15px" }} />
              )
            ) : (
              <Skeleton
                animation="wave"
                variant="circular"
                width={10}
                height={10}
              />
            )}
          </Typography>
        ) || null
      }
      sx={{
        width: "auto",
        justifyContent: "end",
      }}
    />
  );
}

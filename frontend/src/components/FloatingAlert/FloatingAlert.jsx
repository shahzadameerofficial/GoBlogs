/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import Snackbar from "@mui/joy/Snackbar";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { Typography, Button } from "@mui/joy";
import { useEffect } from "react";

export default function FloatingAlert({ alert, onComplete }) {
  useEffect(() => {
    if (alert.duration > 0) {
      setTimeout(() => {
        onComplete?.(false);
      }, alert.duration);
    }
  }, [alert.duration]);
  return (
    <>
      <Snackbar
        variant={alert.variant}
        color={alert.color}
        open={alert.visible}
        onClose={() => onComplete?.(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        startDecorator={alert.color === 'danger' ? (<ErrorIcon />) : (<CheckCircleIcon />)}
        endDecorator={
          <Button
            onClick={() => onComplete?.(false)}
            size="sm"
            variant={alert.variant}
            color={alert.color}
          >
            Close
          </Button>
        }
      >
        {alert.heading && (
          <Typography level="title-sm">{alert.heading}: </Typography>
        )}
        {alert.message}
      </Snackbar>
    </>
  );
}

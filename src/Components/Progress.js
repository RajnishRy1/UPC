import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useDispatch, useSelector } from "react-redux";
import { CurrentStateActions } from "./Store/CurrentStateSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import client from "./WebSocket/webSocket";

export default function Progress(props) {
  const [progress, setProgress] = React.useState(0);
  const currentState = useSelector((state) => state.CurrentState);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentState.fetching) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = async (message) => {
      let data = JSON.parse(message.data);
      setProgress(data.progress);
    };
  }, []);

  const dispatch = useDispatch();

  const alertAbort = (event) => {
    let confirmation = window.confirm(
      "Are you sure?\nAborting the process with Reset all the progress!"
    );
    if (confirmation) {
      //API CALL FOR ABORTING
      fetch("http://localhost:4000/stop")
        .then((response) => {
          if (response.status) {
            dispatch(CurrentStateActions.setFetching({ fetching: false }));
            dispatch(CurrentStateActions.setUploaded({ uploaded: false }));
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="form-control">
        <div className="header"></div>
        <div className="progress flex">
          <div className="fetching">
            Fetching Data....{currentState.value.toFixed(2)}
          </div>
        </div>
        <div className="progress-bar">
          <Box sx={{ width: "100%" }}>
            <LinearProgress variant="determinate" value={currentState.value} />
          </Box>
        </div>
        <button type="button" className="btn btn-danger" onClick={alertAbort}>
          Abort
        </button>
      </div>
    </>
  );
}

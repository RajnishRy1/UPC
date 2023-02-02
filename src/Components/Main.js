import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../Assets/css/style.css";
import { UploadComponent } from "./FileChoose";
import FileSelect from "./FileSelect";
import Navlist from "./Navlist/Navlist";
import Progress from "./Progress";
import client from "./WebSocket/webSocket";
import Download from "./Download";

const Main = () => {
  const CurrentState = useSelector((state) => state.CurrentState);
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const upload = () => {
    setUploaded(true);
    return true;
  };
  const resetFile = () => {
    setFile(null);
  };

  return (
    <>
      <Navlist />
      {file == null ? (
        <FileSelect file={file} setFile={setFile} />
      ) : (
        <UploadComponent
          file={file}
          upload={upload}
          resetFile={resetFile}
          uploaded={uploaded}
          started={started}
          setStarted={setStarted}
        />
      )}
      {CurrentState.fetching ? <Progress /> : null}
      {CurrentState.completed ? <Download /> : null}
    </>
  );
};

export default Main;

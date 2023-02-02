import { useDispatch, useSelector } from "react-redux";
import { fileActions } from "./Store/InputfileSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentStateActions } from "./Store/CurrentStateSlice";
import { makeReq } from "./Barcode_Lookup/dsg";
import useProgress from "./Barcode_Lookup/useProgress";

const FileChoose = (props) => {
  const file = props.file;
  const setFile = props.setFile;
  return (
    <>
      <InputComponent setFile={setFile} />
    </>
  );
};

const InputComponent = (props) => {
  const fileHandler = (event) => {
    props.setFile(event.target.files[0]);
  };
  return (
    <>
      <div className="margin1">
        <div className="flex ">
          <input
            className="fileInput"
            accept=".xlsx"
            onChange={fileHandler}
            type="file"
          ></input>
        </div>
      </div>
    </>
  );
};

export const UploadComponent = (props) => {
  const file = props.file;
  const resetfile = props.resetFile;
  const started = props.started;
  const setStarted = props.setStarted;
  const CurrentState = useSelector((state) => state.CurrentState);
  return (
    <>
      <UploadUi file={file} upload={props.upload} resetFile={props.resetFile} />
    </>
  );
};

const UploadUi = (props) => {
  const CurrentState = useSelector((state) => state.CurrentState);
  const dispatch = useDispatch();
  const { setProgressValue, setCompletion } = useProgress();
  const upload = () => {
    // UPLOAD FILE
    const formData = new FormData();
    formData.append("UPC", props.file, "UPC");
    fetch("http://localhost:4000/upload", {
      method: "POST",
      body: formData,
    })
      .then(async (response) => {
        if (response.status == 200) {
          dispatch(CurrentStateActions.setUploaded({ uploaded: true }));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(CurrentStateActions.setUploaded({ uploaded: false }));
      });
  };
  const cancel = () => {
    props.resetFile();
    //DELETE FILE FROM BACKEND
    fetch("http://localhost:4000/deletefile")
      .then((response) => {
        if (response.status == 200) {
          dispatch(CurrentStateActions.setUploaded({ uploaded: false }));
          dispatch(CurrentStateActions.setFetching({ fetching: false }));
        }
      })
      .catch((err) => {});
  };

  const start = () => {
    //API CALL
    if (CurrentState.vendor == "") {
      window.alert("Please Select Vendor!");
      return;
    }
    if (CurrentState.vendor == "dsg") {
      dispatch(CurrentStateActions.setFetching({ fetching: true }));
      makeReq(setProgressValue, setCompletion);
    } else {
      fetch("http://localhost:4000/start")
        .then(async (response) => {
          if (response.status == 200) {
            dispatch(CurrentStateActions.setFetching({ fetching: true }));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    //dispatch(CurrentStateActions.setFetching({ fetching: true }));
  };

  const checkBoxHandler = (e) => {
    let value = e.target.value;
    dispatch(CurrentStateActions.setVendor({ vendor: value }));
  };

  return (
    <>
      <div className="header"></div>
      <div className="form-control">
        {/* <h3 className="heading1">File : {props.file.name}</h3> */}
        <div className="heading1">
          <b> File : {props.file.name} </b>{" "}
          {CurrentState.uploaded ? (
            <span className="badge rounded-pill bg-success">Uploaded</span>
          ) : null}
        </div>
        <form>
          <button
            type="button"
            className="btn btn-primary btn-padding"
            onClick={upload}
            disabled={CurrentState.uploaded}
          >
            {" "}
            Upload
          </button>
          <button
            disabled={CurrentState.fetching}
            type="button"
            className="btn btn-danger btn-padding"
            onClick={cancel}
          >
            {" "}
            Cancel
          </button>
        </form>
        <div>
          <input
            type={"radio"}
            value={"dsg"}
            name="vendor"
            onChange={checkBoxHandler}
          ></input>{" "}
          DSG
          <br />
          <input
            type={"radio"}
            value={"jcpenney"}
            name="vendor"
            onChange={checkBoxHandler}
          ></input>{" "}
          JCPENNEY
        </div>
        <div>
          <button
            type="button"
            hidden={!CurrentState.uploaded}
            disabled={CurrentState.fetching}
            className="btn btn-success btn-padding"
            onClick={start}
          >
            {" "}
            Start Fetching
          </button>
        </div>
      </div>
    </>
  );
};

export default FileChoose;

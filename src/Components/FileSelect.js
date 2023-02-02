import Drag from "./Drag";
import FileChoose from "./FileChoose";

const FileSelect = (props) => {
  let file = props.file;
  const setFile = props.setFile;
  return (
    <>
      <Drag file={file} setFile={setFile} />
      <div className="flex">
        <p style={{ marginTop: "0px" }}>OR</p>
      </div>
      <FileChoose file={file} setFile={setFile} />
    </>
  );
};

export default FileSelect;

import "../Assets/css/style.css";

const Drag = (props) => {
  const file = props.file;
  const setFile = props.setFile;
  const dropHandler = (event) => {
    event.preventDefault();

    if (event.dataTransfer.items) {
      if (!(event.dataTransfer.items.length > 1)) {
        // Use DataTransferItemList interface to access the file(s)
        [...event.dataTransfer.items].forEach((item, i) => {
          // If dropped items aren't files, reject them
          if (item.kind === "file") {
            const file = item.getAsFile();
            setFile(file);
          }
        });
      } else {
        window.alert("Please Drag a single file only!");
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      [...event.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
      });
    }
  };
  const dragOverHandler = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="header"></div>
      <div className="clearfix"></div>
      <div className="flexbox-container">
        <div
          className="flexbox-item-outer flex"
          onDrop={dropHandler}
          onDragOver={dragOverHandler}
        >
          <p> Drag Files Here</p>
        </div>
      </div>
    </>
  );
};

export default Drag;

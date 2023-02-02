import Axios from "axios";
import FileDownload from "js-file-download";

const Download = () => {
  const download = (e) => {
    e.preventDefault();
    Axios({
      url: "http://localhost:4000/download",
      method: "GET",
      responseType: "blob",
    }).then((res) => {
      console.log(res.data);
      FileDownload(res.data, "UPC.xlsx");
    });
  };

  return (
    <>
      <div className="form-control">
        <button type="button" className="btn btn-danger" onClick={download}>
          Download File
        </button>
      </div>
    </>
  );
};

export default Download;

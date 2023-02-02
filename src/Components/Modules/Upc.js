import $ from "jquery";

const getCsv = () => {
  let Arr;
  try {
    $.ajax({
      url: "http://localhost:4000/upcs",
      type: "GET",
      async: false,
      success: function (result) {
        Arr = result;
      },
    });
  } catch (err) {
    console.log(err);
  }
  return Arr;
};

const getUrls = () => {
  let Arr;
  try {
    $.ajax({
      url: "http://localhost:4000/upcurls",
      type: "GET",
      async: false,
      success: function (result) {
        Arr = result;
      },
    });
  } catch (err) {
    console.log(err);
  }
  return Arr;
};
// export default getCsv = getCsv;
export { getCsv, getUrls };

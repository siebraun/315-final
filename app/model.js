export function changePage(pageID, subPageID) {
  if (subPageID == undefined) {
    $.get(`pages/${pageID}.html`, function (data) {
      // console.log(data);
      $("#app").html(data);
    }).fail((error) => {
      if (error.status == "404") {
        //   alert("Page can not be found. Please check your url!");
      }
      console.log("error", error.status);
    });
  } else {
    $.get(`pages/${pageID}/${subPageID}.html`, function (data) {
      // console.log(data);
      $("#app").html(data);
    }).fail((error) => {
      if (error.status == "404") {
        //   alert("Page can not be found. Please check your url!");
      }
      console.log("error", error.status);
    });
  }
}

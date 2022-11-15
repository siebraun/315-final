import * as MODEL from "./app.js";
var userInfo = {};

export function changePage(pageID, subPageID) {
  if (subPageID == undefined) {
    $.get(`pages/${pageID}.html`, function (data) {
      $("#app").html(data);
      MODEL.initSubmitListener();
      MODEL.createRecipe();
      MODEL.loopData();
      MODEL.deleteRecipe();
    }).fail((error) => {
      if (error.status == "404") {
      }
      console.log("error", error.status);
    });
  } else {
    $.get(`pages/${pageID}/${subPageID}.html`, function (data) {
      // console.log(data);
      $("#app").html(data);
      MODEL.initSubmitListener();
      MODEL.createRecipe();
      MODEL.loopData();
      MODEL.deleteRecipe();
    }).fail((error) => {
      if (error.status == "404") {
        //   alert("Page can not be found. Please check your url!");
      }
      console.log("error", error.status);
    });
  }
}

export function setUserInfo(userObject) {
  userInfo = userObject;
  console.log(userInfo);
}

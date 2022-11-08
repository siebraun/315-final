import * as MODEL from "./model.js";

function changeRoute() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");

  if (pageID == "" || pageID == "home") {
    MODEL.changePage(pageID);
  } else if (pageID == "login") {
    MODEL.changePage(pageID);
    $("#app, nav, footer").css("background-color", "var(--yellow)");
  } else {
    MODEL.changePage(pageID);
  }
}

// handle nav changes
function initApp() {
  $(window).on("hashchange", changeRoute);
}

//log-in function
export function initSubmitListener() {
  $("#register").click(function (e) {
    let email = $("#email").val();
    let password = $("#pw").val();
    let fname = $("#fname").val();
    let lname = $("#lname").val();
    // console.log("inputs " + email + " " + password + " " + fname + " " + lname);

    $(".hidden").css("display", "inline");
    console.log("hi");
  });
  // console.log("hi");
}

$(document).ready(function () {
  initApp();
  // initSubmitListener();
});

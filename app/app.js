import * as MODEL from "./model.js";

// RECIPES DATA
let obj = {
  Recipes: [
    {
      name: "Supreme Pizza",
      imgsrc: "../assets/images/recipe-pizza.jpg",
      desc: "mmm yummy pizza",
      totalTime: "1hr 24min",
      servings: "4 servings",
      ingred1: "ham",
      ingred2: "burger",
      ingred3: "",
      instruct1: "go to mcdonalds",
      instruct2: "order hamburger",
      instruct3: "eat hamburger",
    },
  ],
};
// ROUTING
function changeRoute() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");

  if (
    pageID == "" ||
    pageID == "home" ||
    pageID == "createRecipe" ||
    pageID == "editRecipe" ||
    pageID == "viewRecipe"
  ) {
    MODEL.changePage(pageID);
    $("#app, nav, footer").css("background-color", "transparent");
  } else if (pageID == "login") {
    MODEL.changePage(pageID);
    $("#app, nav, footer").css("background-color", "var(--yellow)");
  } else if (pageID == "browse" || pageID == "yourRecipes") {
    MODEL.changePage(pageID);
    $("#app, nav, footer").css("background-color", "var(--green)");
  }
}

// handle nav changes
function initApp() {
  $(window).on("hashchange", changeRoute);
}

// LOG IN FUNCTION
export function initSubmitListener() {
  $(".register").click(function (e) {
    let email = $("#email").val();
    let password = $("#pw").val();
    let fname = $("#fname").val();
    let lname = $("#lname").val();

    // show hidden nav on log-in
    $(".hidden").css("display", "inline");
    console.log("hi");

    //navigate to your recipes page
    MODEL.changePage("yourRecipes");
    $("#app, nav, footer").css("background-color", "var(--green)");
  });
}

$(document).ready(function () {
  initApp();
  // initSubmitListener();
});

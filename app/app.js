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

  yourRecipes: [
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

// define localstorage items
let yourimg = localStorage.getItem("imgsrc");
let yourname = localStorage.getItem("name");
let yourdesc = localStorage.getItem("desc");
let yourtime = localStorage.getItem("totalTime");
let yourservings = localStorage.getItem("servings");
let youringred1 = localStorage.getItem("ingred1");
let youringred2 = localStorage.getItem("ingred2");
let youringred3 = localStorage.getItem("ingred3");
let yourinst1 = localStorage.getItem("instruct1");
let yourinst2 = localStorage.getItem("instruct2");
let yourinst3 = localStorage.getItem("instruct3");

window.localStorage.setItem("yourrecipes", JSON.stringify(obj.Recipes));

let newRecipe = window.localStorage.getItem("yourrecipes");
console.log(JSON.parse(newRecipe));

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
    // initSubmitListener();
    // MODEL.createRecipe();
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

//
//
//
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

    //navigate to your yourrecipes page
    MODEL.changePage("createRecipe");
    $("#app, nav, footer").css("background-color", "white");

    $(".create-wrapper .formHolder").append(`<h1>Hi</h1>`);

    // console.log("hi");
  });
}

//
//
//
//
// view recipe function
export function viewRecipe() {
  $(".view-yourrecipes").append(`
  <div class="recipe-wrapper">
      <div class="recipe-details">
        <div class="recipe-img">
          <button onclick="viewRecipe(${idx})">View</button>
        </div>

        <div class="recipe-info">
          <h1>${yourname}</h1>
          <p>${yourdesc}</p>
          <p>${yourtime}</p>
          <p>${yourservings}</p>
        </div>
      </div>

      <div class="recipe-buttons">
        <button onclick="editRecipe(${idx})">Edit</button>
        <button onclick="deleteRecipe(${idx})">Delete</button>
      </div>
    </div>
  `);
}

//
//
//
// loop data
export function loopData() {
  //clear data
  $(".recipes").html("");

  // add recipe to list
  $.each(obj.yourRecipes, (idx, yourrecipes) => {
    $(".yourrecipes").append(
      `<p>${yourrecipes.name}</p>
      <p>${yourrecipes.imgsrc}</p>
      <p>${yourrecipes.desc}</p>
      <p>${yourrecipes.totalTime}</p>
      <p>${yourrecipes.servings}</p>
      <p>${yourrecipes.ingred1}</p>
      <p>${yourrecipes.ingred2}</p>
      <p>${yourrecipes.ingred3}</p>
      <p>${yourrecipes.instruct1}</p>
      <p>${yourrecipes.instruct2}</p>
      <p>${yourrecipes.instruct3}</p>
      `
    );

    localStorage.setItem("imgsrc", JSON.stringify(yourrecipes.imgsrc));
    localStorage.setItem("name", JSON.stringify(yourrecipes.name));
    localStorage.setItem("desc", yourrecipes.desc);
    localStorage.setItem("totalTime", yourrecipes.totalTime);
    localStorage.setItem("servings", yourrecipes.servings);
    localStorage.setItem("ingred1", yourrecipes.ingred1);
    localStorage.setItem("ingred2", yourrecipes.ingred2);
    localStorage.setItem("ingred3", yourrecipes.ingred3);
    localStorage.setItem("instruct1", yourrecipes.instruct1);
    localStorage.setItem("instruct2", yourrecipes.instruct2);
    localStorage.setItem("instruct3", yourrecipes.instruct3);

    $(".recipes").append(`
  <div class="recipe-wrapper">
      <div class="recipe-details">
        <div class="recipe-img">
          <button onclick="viewRecipe(${idx})">View</button>
        </div>

        <div class="recipe-info">
          <h1>${yourname}</h1>
          <p>${yourdesc}</p>
          <p>${yourtime}</p>
          <p>${yourservings}</p>
        </div>
      </div>

      <div class="recipe-buttons">
        <button onclick="editRecipe(${idx})">Edit</button>
        <button id="delete">Delete</button>
      </div>
    </div>
  `);

    // viewRecipe();
  });
}

export function deleteRecipe(recipeId) {
  $("#delete").on("click", (e) => {
    obj.yourRecipes.splice(recipeId, 1);
    localStorage.removeItem("imgsrc");
    localStorage.removeItem("name");
    localStorage.removeItem("desc");
    localStorage.removeItem("totalTime");
    localStorage.removeItem("servings");
    localStorage.removeItem("ingred1");
    localStorage.removeItem("ingred2");
    localStorage.removeItem("ingred3");
    localStorage.removeItem("instruct1");
    localStorage.removeItem("instruct2");
    localStorage.removeItem("instruct3");
    loopData();
  });
}

// create recipe
export function createRecipe() {
  // add recipe
  $("#addRecipeSubmit").click(function (e) {
    let rN = $("#recipeName").val();
    let rImg = $("#recipeImg").val();
    let rDesc = $("#recipeDesc").val();
    let rTime = $("#recipeTime").val();
    let rServings = $("#recipeImg").val();
    let i1 = $("#ingred1").val();
    let i2 = $("#ingred2").val();
    let i3 = $("#ingred3").val();
    let inst1 = $("#instruct1").val();
    let inst2 = $("#instruct2").val();
    let inst3 = $("#instruct3").val();

    // add recipe to array
    obj.yourRecipes.push({
      name: rN,
      imgsrc: rImg,
      desc: rDesc,
      totalTime: rTime,
      servings: rServings,
      ingred1: i1,
      ingred2: i2,
      ingred3: i3,
      instruct1: inst1,
      instruct2: inst2,
      instruct3: inst3,
    });

    console.log(obj.yourRecipes);
    loopData();
    // document.getElementById("addStudent").val("");
  });
}

// function loadRecipes(idx, yourrecipes) {

// }

$(document).ready(function () {
  // createRecipe();
  initApp();
  initSubmitListener();
});

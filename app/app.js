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

    // let firstname = localStorage.getItem("fname");

    // show hidden nav on log-in
    $(".hidden").css("display", "inline");
    console.log("hi");

    //navigate to your yourrecipes page
    MODEL.changePage("yourRecipes");
    $("#app, nav, footer").css("background-color", "transparent");

    // loopData();

    document.getElementById("helloMessage").append(fname);

    // console.log("hi");
  });
}
//
//
//
//
// view recipe function
// export function viewRecipe(idx, recipeObj) {
//   $(".view-yourrecipes").append(`
//   <div class="recipe-wrapper">
//       <div class="recipe-details">
//         <div class="recipe-img">
//           <button onclick="viewRecipe(${idx})">View</button>
//         </div>

//         <div class="recipe-info">
//           <h1>${recipeObj.info}</h1>

//         </div>
//       </div>

//       <div class="recipe-buttons">
//         <button onclick="editRecipe(${idx})">Edit</button>
//         <button onclick="deleteRecipe(${idx})">Delete</button>
//       </div>
//     </div>
//   `);
// }

//
//
//
// loop data
export function loopData() {
  //clear data
  $(".recipes").html("");

  // add recipe to list
  $.each(obj.yourRecipes, (idx, yourrecipes) => {
    $(".yourrecipes").append(`
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
  let ingredCount = 3;
  let instCount = 3;

  $("#addIngred").on("click", (e) => {
    // console.log("hi!");

    $(".formIngredients").append(
      `<input id="ingred$(ingredCount)" placeholder="Ingredient # ${
        ingredCount + 1
      }" type="text">`
    );

    ingredCount++;
    console.log(ingredCount);
  });

  // add instructions
  $("#addInst").on("click", (e) => {
    // console.log("hi!");

    $(".formInstructions").append(
      `<input id="inst$(instCount)" placeholder="Instruction #${
        instCount + 1
      }" type="text">`
    );

    instCount++;
    console.log(instCount);
  });

  //
  //
  //
  //
  // submit the info
  $("#recipeSubmit").on("click", (e) => {
    let recipeObj = [];
    e.preventDefault();

    $(".formHolder .formInstructions input").each((idx, instruction) => {
      //   console.log(instruction.value);
      recipeObj.push({ instructions: instruction.value });
    });

    $(".formHolder .formIngredients input").each((idx, ingredients) => {
      //   console.log(instruction.value);
      recipeObj.push({ ingredients: ingredients.value });
    });

    $(".formHolder .basicInfo input").each((idx, info) => {
      recipeObj.push({
        info: info.value,
      });
    });

    console.log(recipeObj);

    /* Setting the local storage to the new recipe object. */

    let infoVals = recipeObj.map((item) => item.info);

    for (let i = 0; i < infoVals.length; i++) {
      var infos = infoVals[i];
      console.log(infos + i);
    }
  });
}

// function loadRecipes(idx, yourrecipes) {

// }

$(document).ready(function () {
  // createRecipe();
  initApp();
  initSubmitListener();
});

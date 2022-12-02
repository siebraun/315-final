import * as MODEL from "./model.js";

var ingredCount = 3;
var instrCount = 3;
var currentRecipe = "";

function route() {
  let hashtagLink = window.location.hash;
  let pageID = hashtagLink.replace("#", "");

  //route pages
  if (pageID == "" || pageID == "home") {
    MODEL.currentPage("home");
  } else if (pageID == "login") {
    MODEL.currentPage("login", initLoginListeners),
      $("body, nav, footer").css("background-color", "var(--yellow)");
    $("body").css("background-image", "none");
  } else if (pageID == "createRecipe") {
    MODEL.currentPage("createRecipe", addRecipe),
      $("body, nav, footer").css("background-color", "white");
    $("body").css("background-image", "none");
  } else if (pageID == "yourRecipes") {
    MODEL.currentPage("yourRecipes", displayUserRecipes),
      $("body").css(
        "background-image",
        "linear-gradient(rgba(167, 232, 189, .8), rgba(167, 232, 189, .8)), url('../assets/images/recipe-hero.jpg')"
      );
    $("nav, footer").css("background-color", "transparent");
  } else if (pageID.indexOf("/") !== -1) {
    MODEL.currentPage(pageID, editRecipe),
      $("body, nav, footer").css("background-color", "white");
    $("body").css("background-image", "none");
  } else if (pageID.indexOf("?") !== -1) {
    MODEL.currentPage(pageID, deleteRecipe);
  } else if (pageID == "yourRecipes") {
    MODEL.currentPage("yourRecipes", initYourRecipesListeners),
      $("body").css(
        "background-image",
        "linear-gradient(rgba(167, 232, 189, .8), rgba(167, 232, 189, .8)), url('../assets/images/recipe-hero.jpg')"
      );
    $("nav, footer").css("background-color", "transparent");
  }
  //if there is no underscore, indexof returns -1
  else if (pageID.indexOf("_") !== -1) {
    MODEL.currentPage(pageID, chosenRecipe);
  } else {
    MODEL.currentPage(pageID);
  }
}

function initLoginListeners() {
  $("#signup").on("click", () => {
    signUp();
  });
  $("#login").on("click", login);

  $("#logout").on("click", logout);
}

// add recipe to users profile
function addRecipe(username) {
  $("#user-hello").html(`Hey ${username}, create your recipe!`);

  $(".addIngred").on("click", (e) => {
    console.log("click");

    $(".formIngredients").append(
      `<input type="text" id="ingred${ingredCount}" placeholder="Ingredient ${
        ingredCount + 1
      }" />`
    );

    ingredCount++;
  });

  $(".addIngred").on("click", (e) => {
    console.log("click");

    $(".formInstructions").append(
      `<input type="text" id="instr${instrCount}" placeholder="Step ${
        instrCount + 1
      }" />`
    );

    instrCount++;
  });
  let recipeObj = {
    image: "",
    name: "",
    desc: "",
    time: "",
    servings: "",
    instructions: [],
    ingredients: [],
  };

  $("#recipeSubmit").on("click", (e) => {
    e.preventDefault();
    console.log("submit");

    recipeObj.image = $("#rImg")[0].value;
    recipeObj.name = $("#rName")[0].value;
    recipeObj.desc = $("#rDesc")[0].value;
    recipeObj.time = $("#rTime")[0].value;
    recipeObj.servings = $("#rServing")[0].value;

    $(".formInstructions input").each((idx, instr) => {
      recipeObj.instructions.push(instr.value);
    });

    $(".formIngredients input").each((idx, ingredient) => {
      recipeObj.ingredients.push(ingredient.value);
    });
    MODEL.addRecipe(recipeObj);
  });
}

// edit recipe function
async function editRecipe(username, recipeid) {
  let recipe = MODEL.viewRecipe(recipeid);
  ingredCount = recipe.ingredients.length;
  instrCount = recipe.instructions.length;
  $("#user-hello").html(`Hey ${username}, edit your recipe!`);

  await $(".basicInfo")
    .append(`<input type="text" id="rImg" value=${recipe.image} />
  <input type="text" id="rName" value=${recipe.name} />
  <input type="text" id="rDesc" value=${recipe.desc} />
  <input type="text" id="rTime" value=${recipe.time} />
  <input type="text" id="rServing" value=${recipe.servings} />`);

  $.each(recipe.ingredients, (idx, ingredient) => {
    $(".formIngredients").append(
      `<input type="text" id="ingred${idx}" value=${ingredient} />`
    );
  });
  $(".formIngredients").append(`<div id="addIngred" class="addButton">+</div>`);

  $.each(recipe.instructions, (idx, instr) => {
    $(".formInstructions").append(
      `<input type="text" id="instr${idx}" value=${instr} />`
    );
  });
  $(".formInstructions").append(`<div id="addInst" class="addButton">+</div>`);

  $(".addIngred").on("click", (e) => {
    console.log("click");

    $(".formIngredients").append(
      `<input type="text" id="ingred${ingredCount}" placeholder="Ingredient ${
        ingredCount + 1
      }" />`
    );

    ingredCount++;
  });

  $(".addIngred").on("click", (e) => {
    console.log("click");

    $(".formInstructions").append(
      `<input type="text" id="instr${instrCount}" placeholder="Step ${
        instrCount + 1
      }" />`
    );

    instrCount++;
  });

  let recipeObj = {
    recipeid: recipeid,
    image: "",
    name: "",
    desc: "",
    time: "",
    servings: "",
    instructions: [],
    ingredients: [],
  };

  $("#recipeSubmit").on("click", (e) => {
    e.preventDefault();
    console.log("submit");

    recipeObj.image = $("#rImg")[0].value;
    recipeObj.name = $("#rName")[0].value;
    recipeObj.desc = $("#rDesc")[0].value;
    recipeObj.time = $("#rTime")[0].value;
    recipeObj.servings = $("#rServing")[0].value;

    $(".formInstructions input").each((idx, instr) => {
      recipeObj.instructions.push(instr.value);
    });

    $(".formIngredients input").each((idx, ingredient) => {
      recipeObj.ingredients.push(ingredient.value);
    });
    MODEL.editRecipe(recipeObj);
    window.location.hash = "yourRecipes";
  });
}

function chosenRecipe(recipeid) {
  let recipe = model.viewRecipe(recipeid);
  $(".view-yourrecipes").html(`
  <h2 >${recipe.name}</h2>
    <img src="${recipe.image}" alt="" />
    <div class="description">
      <h2>Description:</h2>
      <p>${recipe.desc}</p> 
      <h3>Total Time:</h3>
      <p>${recipe.time}</p>
      <h3>Servings:</h3>
      <p>${recipe.servings}</p>
    </div>
  `);
  $(recipe.ingredients).each((idx, ingredient) => {
    $(".ingredients").append(`
    <div>${ingredient}</div>
    `);
  });
  $(recipe.instructions).each((idx, instruction) => {
    $(".instructions").append(`
    <div>${instruction}</div>
    `);
  });
}

function initListeners() {
  console.log("ready");
  $(window).on("hashchange", route);
  route();
  MODEL.viewRecipe();
}

function signUp() {
  let fn = $("#fname").val();
  let ln = $("#lname").val();
  let email = $("#email").val();
  let password = $("#pw").val();

  MODEL.signup(fn, ln, email, password);

  $("#fname").val("");
  $("#lname").val("");
  $("#signup-email").val("");
  $("#signup-password").val("");

  $(".links").html(`
  <a href="#home">Home</a>
  <a href="#browse">Browse</a>
  <a href="#createRecipe">Create Recipe</a>
  <a href="#yourRecipes">Your Recipes</a>
  
  <a class="login" href="#login" id="logout"
    >Logout</a
  >`);
}

function login() {
  let email = $("#email").val();
  let password = $("#pw").val();

  MODEL.login(email, password);

  // clear entries
  $("#email").val("");
  $("#pw").val("");

  $(".links").html(`
  <a href="#home">Home</a>
  <a href="#browse">Browse</a>
  <a href="#createRecipe">Create Recipe</a>
  <a href="#yourRecipes">Your Recipes</a>
  
  <a class="login" href="#login" id="logout"
    >Logout</a
  >
  `);
}

function logout() {
  //send user home
  console.log("log out");
  localStorage.removeItem("currentUser");
  MODEL.logout();
  $(".links").html(`
  <a href="#home" id="home">Home</a>
        <a href="#browse" id="browse">Browse</a>
        
        <a class="login" id="login" href="#login">Login</a>
  `);
}

function displayUserRecipes(username) {
  let recipes = MODEL.viewUserRecipes();
  $("#user-hello").html(`Hey ${username}, here are your recipes!`);
  console.log(recipes);
  $.each(recipes, (idx, recipe) => {
    $(".your-recipes-wrapper")
      .append(`<div class="recip-container"><div class="recipe"><div class="rImg">
    <img src="${recipe.image}" alt="">
    <a href="#viewRecipe/${recipe.recipeid}">View</a>
    </div>
    <div class="rDescription">
    <h3>${recipe.name}</h3>
    <p class="description">${recipe.desc}</p>
    <div  class="recipe-details"><img style="width: 23px; margin-right: 17px;"  src="../assets/images/time.svg" alt="clock image" /><p class="time">${recipe.time}</p></div>
    <div  class="recipe-details"><img style="width: 23px; margin-right: 17px;"  src="../assets/images/servings.svg" alt="recipe serving size" /><p class="serving">${recipe.servings}</p></div>
    </div>
    
    </div>
    
    <div class="recipeButtons">
    <a href="#editRecipe/${recipe.recipeid}">Edit Recipe</a>
    <a href="#deleteRecipe?${recipe.recipeid}">Delete</a>
     
    </div>
    </div>
    `);
  });
}

function deleteRecipe(recipeid) {
  $("#delete").on("click", () => {
    MODEL.deleteRecipe(recipeid);
    routeToHome();
  });
}

$(document).ready(function () {
  initListeners();
});

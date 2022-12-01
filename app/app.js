import * as MODEL from "./model.js";

var ingredCount = 3;
var instrCount = 3;
var currentRecipe = "";

function route() {
  let hashtagLink = window.location.hash; //get page from hashtag in url
  let pageID = hashtagLink.replace("#", ""); //set page id without hashtag

  //route pages
  if (pageID == "" || pageID == "home") {
    MODEL.currentPage("home");
  } else if (pageID == "login") {
    MODEL.currentPage("login", initLoginListeners);
  } else if (pageID == "createRecipe") {
    MODEL.currentPage("createRecipe", addRecipe);
  } else if (pageID == "yourRecipes") {
    MODEL.currentPage("yourRecipes", displayUserRecipes);
  } else if (pageID.indexOf("/") !== -1) {
    MODEL.currentPage(pageID, editRecipe);
  } else if (pageID == "yourRecipes") {
    MODEL.currentPage("yourRecipes", initYourRecipesListeners);
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
    // console.log("hello");
  });
  $("#login").on("click", login);

  $("#login").on("click", logout);
}

function addRecipe(username) {
  $("#name-greeting").html(`Hey ${username}, create your recipe!`);

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
    goHome();
  });
}

//whenever the larger "recipes page" gets made, each recipe needs to have the "edit" button pass over the recipeid
async function editRecipe(username, recipeid) {
  let recipe = MODEL.viewSingleRecipe(recipeid);
  ingredCount = recipe.ingredients.length;
  instrCount = recipe.instructions.length;
  $("#name-greeting").html(`Hey ${username}, edit your recipe!`);

  await $(".inputs-section")
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
  $(".formIngredients").append(`<div class="addIngredButton"><p>+</p></div>`);

  $.each(recipe.instructions, (idx, instr) => {
    $(".formInstructions").append(
      `<input type="text" id="instr${idx}" value=${instr} />`
    );
  });
  $(".formInstructions").append(`<div class="addStepButton"><p>+</p></div>`);

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
    recipeObj.servings = $("#rServings")[0].value;

    $(".formInstructions input").each((idx, instr) => {
      recipeObj.instructions.push(instr.value);
    });

    $(".formIngredients input").each((idx, ingredient) => {
      recipeObj.ingredients.push(ingredient.value);
    });
    MODEL.editRecipe(recipeObj);
  });
}

//whenever the larger "recipes page" gets made, each recipe needs to have the "view" button pass over the recipeid
function chosenRecipe(recipeid) {
  let recipe = model.viewSingleRecipe(recipeid);
  $(".recipe-header").html(`
  <h2 id="sw-rName">${recipe.name}</h2>
    <img src="${recipe.image}" alt="" />
    <div class="description">
      <h2>Description:</h2>
      <p>${recipe.description}</p>
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
  MODEL.viewAllRecipes();
}

function signUp() {
  let fn = $("#fname").val();
  let ln = $("#lname").val();
  let email = $("#email").val();
  let password = $("#pw").val();

  MODEL.signup(fn, ln, email, password, goHome);

  $("#fname").val("");
  $("#lname").val("");
  $("#signup-email").val("");
  $("#signup-password").val("");

  $(".hidden").css("display", "inline-block");
  $("#login").css("display", "none");
}

function login() {
  let email = $("#login-email").val();
  let password = $("#login-password").val();

  MODEL.login(email, password, goHome);

  $("#login-email").val("");
  $("#login-password").val("");

  $(".hidden").css("display", "inline-block");
  $("#login").css("display", "none");
}

function logout() {
  MODEL.logout(goHome);
  $(".nav-links").html(`
  <a href="#home" id="home">Home</a>
        <a href="#browse" id="browse">Browse</a>
        <a href="#create-recipe" id="create-recipe">Create Recipe</a>
        
        <a class="site-btn" id="nav-login" href="#login"><span>Login</span></a>
  `);
}

function goHome() {
  window.location.hash = "#home";
}

function displayAllRecipes() {
  //you can use this allrecipes variable to display the whole list of recipes
  //allRecipes will come back as an array of objects
  let allRecipes = model.viewAllRecipes();
  $.each(allRecipes, (idx, recipe) => {
    //append to the page here
  });
}

function displayUserRecipes(username) {
  let recipes = MODEL.viewUserRecipes();
  $("#name-greeting").html(`Hey ${username}, here are your recipes!`);
  console.log(recipes);
  $.each(recipes, (idx, recipe) => {
    $(".recipes-container")
      .append(`<div class="ind-container"><div class="ind-recipe"><div class="rImg-section">
    <img src="${recipe.image}" alt="">
    <a href="#individual_recipe_${recipe.recipeid}">View</a>
    </div>
    <div class="rDescription">
    <h3>${recipe.name}</h3>
    <p class="description">${recipe.desc}</p>
    <div class="recipe-details"><img src="./images/time.svg" alt="time-svg" /><p class="time">${recipe.time}</p></div>
    <div class="recipe-details"><img src="./images/servings.svg" alt="servings-svg" /><p class="serving">${recipe.servings}</p></div>
    </div>
    
    </div>
    
    <div class="edit-delete-btns">
    <a href="#edit-recipe/${recipe.recipeid}">Edit Recipe</a>
      <a href="#delete-recipe/${recipe.recipeid}">Delete</a>
     
    </div>
    </div>
    `);
  });
}

function initYourRecipesListeners() {
  $("");
}

$(document).ready(function () {
  initListeners();
});

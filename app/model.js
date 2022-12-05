/**
 * ***
BEGIN USER FUNCTIONS 
***
 */

//define currentUser from localstorage
export function getUser() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return currentUser;
}

//sign up
export async function signup(fname, lname, email, pw, callback) {
  //create user from login form
  var user = {
    firstName: fname,
    lastName: lname,
    email: email,
    password: pw,
    status: true,
  };

  //set user in local storage
  await localStorage.setItem("currentUser", JSON.stringify(user));

  // send user to their recipes
  window.location.hash = "#yourRecipes";
}

//log in
export async function login(username, pw, callback) {
  //get user from local storage
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    //check if username and password match
    if (currentUser.username == username) {
      if (currentUser.password == pw) {
        currentUser.status = true;
        await localStorage.setItem("currentUser", JSON.stringify(currentUser));
        console.log("logged in");
        callback();
      } else {
        //nicer alerts needed
        alert("wrong password");
      }
    } else {
      //nicer alerts needed
      alert("wrong username");
    }
  } else {
    alert("website has no users");
  }

  // send user to their recipes
  window.location.hash = "#yourRecipes";
}

//log out
export function logout() {
  if (localStorage) {
    //remove currentUser from localstorage
    localStorage.removeItem("currentUser");
  }
}

/**
 * ***
END USER FUNCTIONS 
***
 */

/**
 * ***
BEGIN RECIPE FUNCTIONS 
***
 */

//view recipe
export function viewRecipe(recipeid) {
  let recipes = JSON.parse(localStorage.getItem("recipes"));
  let user = JSON.parse(localStorage.getItem("currentUser"));
  let recipe = recipes[recipeid];

  // console.log(recipe);
  return recipe;
}

// add recipe to recipeObj array
export function addRecipe(recipeObj) {
  if (localStorage.getItem("recipes") !== null) {
    //get recipes from localstorage
    var recipes = JSON.parse(localStorage.getItem("recipes"));
  } else {
    //else return an empty array
    var recipes = [];
  }

  // set recipeid and send array to local storage
  recipeObj.recipeid = recipes.length;
  recipes.push(recipeObj);
  localStorage.setItem("recipes", JSON.stringify(recipes));

  //better alert needed
  alert("You've added " + recipeObj.name + " to your recipes!");
}

//edit recipe
export function editRecipe(recipeObj) {
  if (localStorage.getItem("recipes") !== null) {
    var recipes = JSON.parse(localStorage.getItem("recipes"));
  }

  //update values
  recipes[recipeObj.recipeid] = {
    recipeid: recipeObj.recipeid,
    image: recipeObj.image,
    name: recipeObj.name,
    desc: recipeObj.desc,
    time: recipeObj.time,
    servings: recipeObj.servings,
    ingredients: recipeObj.ingredients,
    instructions: recipeObj.instructions,
  };

  //update in localstorage
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

//delete recipe
export function deleteRecipe(recipeid) {
  console.log("hi");
  if (localStorage.getItem("recipes") !== null) {
    //get recipe array
    var recipes = JSON.parse(localStorage.getItem("recipes"));
  } else {
    alert("recipe not found");
  }

  //remove recipe
  recipes.splice(recipeid, 1);

  //update local storage to not have that recipe
  localStorage.setItem("recipes", JSON.stringify(recipes));

  console.log(recipes);
}

export function viewUserRecipes() {
  let user = JSON.parse(localStorage.getItem("currentUser"));
  if (user.status == true) {
    let userRecipes = JSON.parse(localStorage.getItem("recipes"));
    return userRecipes;
  }
}

export function currentPage(pageID, callback) {
  if (pageID == "" || pageID == "home") {
    $.get(`pages/home.html`, function (data) {
      $("#app").html(data);
    });
  } else if (pageID == "login") {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      if (user.status == true) {
        $.get(`pages/login.html`, function (data) {
          $("#app").html(data);
          callback();
        });
      }
    } else {
      $.get(`pages/login.html`, function (data) {
        $("#app").html(data);
        callback();
      });
    }
  } else if (pageID == "createRecipe") {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    $.get(`pages/${pageID}.html`, function (data) {
      $("#app").html(data);
      callback(user.firstName);
    });
  } else if (pageID == "yourRecipes") {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    $.get(`pages/${pageID}.html`, function (data) {
      $("#app").html(data);
      callback(user.firstName);
    });
  } else if (pageID.indexOf("/") !== -1) {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    let itemID = pageID.substring(pageID.indexOf("/") + 1);
    let page = pageID.substring(0, pageID.indexOf("/"));
    $.get(`pages/${page}.html`, function (data) {
      $("#app").html(data);
      callback(user.firstName, itemID);
    });
  } else if (pageID.indexOf("_") !== -1) {
    let itemID = pageID.substring(pageID.indexOf("_") + 1);
    $.get(`pages/${pageID}.html`, function (data) {
      $("#app").html(data);
      callback(itemID);
    });
  } else {
    $.get(`pages/${pageID}.html`, function (data) {
      $("#app").html(data);
      callback();
    });
  }

  //if the page in the nav contains the pageID, give it a bottom border
  // $(`#${pageID}`).addClass("current-page")
}

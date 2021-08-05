const searchform = document.querySelector("form");
const searchresultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
const slogan = document.querySelector(".slogans");

let searchQuery = "";

const APP_ID = "94b061a8";
const APP_KEY = "78ee673f8aeb70f64462f670862c24eb";

// initiate the search result 
searchform.addEventListener("submit", function (eve) {
  eve.preventDefault();

  // takes input from search query
  searchQuery = eve.target.querySelector("input").value;
  
  // calls the fetchAPI function
  fetchAPI(searchQuery);
});

async function fetchAPI(searchQ) 
{
  // The api link to call the data and converting to JSON file
  const ApiUrl = `https://api.edamam.com/search?q=${searchQ}&app_id=94b061a8&app_key=78ee673f8aeb70f64462f670862c24eb&to=20`;
  const res = await fetch(ApiUrl);
  const data = await res.json();
  console.log(data);

  // calling the generatedHTML function for search result
  generateHTML(data.hits);
}

function generateHTML(results) 
{
  // to hide the containers and placeholder recipes
    container.classList.remove('initial');
    slogan.classList.add("hidden");
  let generatedHTML = "";

  // function will genrate a array of result and stores it in generatedHTML
  results.map((result) => {
    // general api functions and showcasing using the api's data
    generatedHTML += `
            <div class="item" id="grad2">
            <img src="${result.recipe.image}" alt="${result.recipe.label}">
                <div class="flex-container">
                    <h1 class="title">${result.recipe.label}</h1>
                    <a href="${result.recipe.url}" class="view-button target="_blank">View Recipe</a>
                </div>
                
                <p class="item-data">Calories: ${Math.round(result.recipe.calories)}</p>
                <p class="item-data">Cuisine Type: ${result.recipe.cuisineType}</p>
                <p class="item-data">Dish Type: ${result.recipe.dishType}</p>
                <p class="item-data">Meal Type: ${result.recipe.mealType}</p>
                <p class="item-data">Ingredients: ${result.recipe.ingredientLines}</p>
            </div>
        `;
  });
  // storing the result in generatedHTML and showcasing the result 
  searchresultDiv.innerHTML = generatedHTML;
}


const spaghetti = document.querySelector("#spaghetti");
const pizza = document.querySelector("#pizza");
const burger = document.querySelector("#burger");
const tacos = document.querySelector("#tacos");
const sandwich = document.querySelector("#sandwich");
const sushi = document.querySelector("#sushi");
const burrito = document.querySelector("#burrito");
const pasta = document.querySelector("#pasta");
const milkshakes = document.querySelector("#milkshakes");
const mocktails = document.querySelector("#mocktails");

// functions for showing the result of the selected recipe when user clicks on it
spaghetti.addEventListener("click", function()
{
  fetchAPI("spaghetti");
})

pizza.addEventListener("click", function()
{
  fetchAPI("pizza");
})

burger.addEventListener("click", function()
{
  fetchAPI("burger");
})

tacos.addEventListener("click", function()
{
  fetchAPI("tacos");
})

sandwich.addEventListener("click", function()
{
  fetchAPI("sandwich");
})

sushi.addEventListener("click", function()
{
  fetchAPI("sushi");
})

burrito.addEventListener("click", function()
{
  fetchAPI("burrito");
})

pasta.addEventListener("click", function()
{
  fetchAPI("pasta");
})

milkshakes.addEventListener("click", function()
{
  fetchAPI("milkshakes");
})

mocktails.addEventListener("click", function()
{
  fetchAPI("mocktails");
})

const refresher = document.querySelector(".refresh");

// function for adding the refresh button on Title of Site
refresher.addEventListener("click", function()
{
  window.location.reload();
})
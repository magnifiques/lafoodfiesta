const searchform = document.querySelector("form");
const searchresultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
const slogan = document.querySelector(".slogans");

const APP_ID = "94b061a8";
const APP_KEY = "YOUR_NEW_APP_KEY";

searchform.addEventListener("submit", function (event) {
  event.preventDefault();

  const searchQuery = event.target.querySelector("input").value.trim();

  if (!searchQuery) {
    return;
  }

  fetchAPI(searchQuery);
});

async function fetchAPI(searchQ) {
  try {
    const apiUrl =
      `https://api.edamam.com/api/recipes/v2` +
      `?type=public` +
      `&q=${encodeURIComponent(searchQ)}` +
      `&app_id=${APP_ID}` +
      `&app_key=${APP_KEY}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(
        `Edamam request failed: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    console.log(data);

    generateHTML(data.hits ?? []);
  } catch (error) {
    console.error("Unable to retrieve recipes:", error);

    searchresultDiv.innerHTML = `
      <p>Unable to retrieve recipes. Please try again.</p>
    `;
  }
}

function generateHTML(results) {
  container.classList.remove("initial");
  slogan.classList.add("hidden");

  if (results.length === 0) {
    searchresultDiv.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  const generatedHTML = results
    .map((result) => {
      const recipe = result.recipe;

      return `
        <div class="item" id="grad2">
          <img
            src="${recipe.image}"
            alt="${recipe.label}"
          >

          <div class="flex-container">
            <h1 class="title">${recipe.label}</h1>

            <a
              href="${recipe.url}"
              class="view-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Recipe
            </a>
          </div>

          <p class="item-data">
            Calories: ${Math.round(recipe.calories)}
          </p>

          <p class="item-data">
            Cuisine Type: ${recipe.cuisineType?.join(", ") ?? "N/A"}
          </p>

          <p class="item-data">
            Dish Type: ${recipe.dishType?.join(", ") ?? "N/A"}
          </p>

          <p class="item-data">
            Meal Type: ${recipe.mealType?.join(", ") ?? "N/A"}
          </p>

          <p class="item-data">
            Ingredients: ${recipe.ingredientLines?.join(", ") ?? "N/A"}
          </p>
        </div>
      `;
    })
    .join("");

  searchresultDiv.innerHTML = generatedHTML;
}

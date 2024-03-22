//Document Grabbers
const searchBttn = document.getElementById("search-btn");
const homeBtn = document.getElementById("home-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");
const quickMeals = document.querySelectorAll(".sub-menu li")

//Event Listeners
searchBttn.addEventListener("click", getMealList);
searchBttn.addEventListener("click", () => {
  backgroundVideo.classList.add("hideVideo");
  mealDetails.classList.add("showContain");
});
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove("showRecipe");
});


//Get Meal list that matches w/ ingredients
function getMealList() {
  let searchInputTxt = document.getElementById("ingredientInput").value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
      let html = `<h2 class = "food-res">Recipes With ${searchInputTxt}:</h2>`;
      if (data.meals) {
        const mealList = document.getElementById('meal');
        data.meals.forEach(meal => {
          html += `
            <div id="meal">
              <div class="meal-item" data-id=${meal.idMeal}>
                <div class="meal-img">
                  <img src="${meal.strMealThumb}" alt="food">
                </div>
                <div class="meal-name">
                  <h3>${meal.strMeal}</h3>
                  <a href="#" class="recipe-btn">Get Recipe</a>
                </div>
              </div>
            </div>
          `;
        });
        mealList.classList.remove("notFound");
      } else {
        html = "Sorry, we didn't find any meals!";
        mealList.classList.add("notFound");
      }
      mealList.innerHTML = html;
    })
    .catch(error => {
      console.error('Error fetching meal data:', error);
    });
}

//Get recipe of the meals
function getMealRecipe(stop) {
  stop.preventDefault();
  if (stop.target.classList.contains("recipe-btn")) {
    let mealItem = stop.target.parentElement.parentElement;
    let mealId = mealItem.dataset.id;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then(response => response.json())
      .then(data => mealRecipeModal(data.meals))

      .catch(error => {
        console.error('Error fetching meal recipe:', error);
      });
  }
}

//Local Storage
var userInput = document.querySelector("#ingredientInput");
var ingredients = JSON.parse(localStorage.getItem("ingredients")) || []; 

// Set the input field value (if any)
userInput.value = ingredients.join(", "); 

searchBttn.addEventListener("click", function() {
    const inputValue = userInput.value.trim(); 
    if (inputValue !== "") {
        ingredients.push(inputValue); 
        localStorage.setItem("ingredients", JSON.stringify(ingredients)); 
        userInput.value = "";
    }
});


//Modal
function mealRecipeModal(meal){
  console.log(meal);
  meal = meal[0];
  let html = `
  <h2 class="recipe-res">${meal.strMeal}</h2>
          <p class="recipe-category">${meal.strCategory}</p>
          <div class="recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
          </div>
          <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="">
          </div>
          <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
          </div>
        </div>
  `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add("showRecipe");
}

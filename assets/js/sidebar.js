const body = document.querySelector("body")
const sidebar = body.querySelector(".sidebar")
const toggle = body.querySelector(".toggle")
const searchBtn = body.querySelector(".seach-box")
const dropdowns = document.querySelectorAll(".dropdown")
const start = body.querySelector(".button")
const backgroundVideo = document.querySelector(".outer-container");
const mealDetails = document.querySelector(".contain");

// Event listeners
toggle.addEventListener("click", () =>{
    sidebar.classList.toggle("close");
});

homeBtn.addEventListener("click", () => {
    backgroundVideo.classList.toggle("hideVideo");
    mealDetails.classList.remove("showContain");
    sidebar.classList.add("close");
  })

start.addEventListener("click", (event) =>{
    event.preventDefault();
    sidebar.classList.remove("close");
});

quickMeals.forEach(quickMeal => {
    quickMeal.addEventListener("click",dropDownMeals);
    quickMeals.forEach(quickMeal => {
        backgroundVideo.classList.remove("hideVideo");
        mealDetails.classList.remove("showContain");
    });
  });

// Sub-menu close and open.
dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector(".select");
    const drop = dropdown.querySelector(".drop");
    const menu = dropdown.querySelector(".sub-menu");
    const options = dropdown.querySelectorAll(".sub-menu li");
    const selected = dropdown.querySelector(".selected"); 
    
    select.addEventListener("click", () => {
        select.classList.toggle("select-clicked");
        drop.classList.toggle("drop-rotate");
        menu.classList.toggle("sub-menu-open");
    });

    options.forEach(option => {
        option.addEventListener("click", () => {
        select.classList.remove("select-clicked");
        drop.classList.remove("drop-rotate");
        menu.classList.remove("sub-menu-open");
        options.forEach(option => {
            option.classList.remove("active");
        });
        option.classList.add("active");
        });
    });
});

function dropDownMeals(){
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${quickMeals}`)
    .then(response => response.json())
      .then(data => {
        let html = `<h2 class = "food-res">Recipes With ${quickMeals}:</h2>`;
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


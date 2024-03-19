const body = document.querySelector("body")
const sidebar = body.querySelector(".sidebar")
const toggle = body.querySelector(".toggle")
const searchBtn = body.querySelector(".seach-box")
const dropdowns = document.querySelectorAll(".dropdown")

// Event listener for side bar close and open.
toggle.addEventListener("click", () =>{
    sidebar.classList.toggle("close");
})

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


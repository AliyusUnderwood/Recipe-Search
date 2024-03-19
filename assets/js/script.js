const body = document.querySelector("body")
const sidebar = body.querySelector(".sidebar")
const toggle = body.querySelector(".toggle")
const searchBtn = body.querySelector(".seach-box")
const dropdown = document.querySelectorAll(".sub-menu")

// Event listener for side bar close and open.
toggle.addEventListener("click", () =>{
    sidebar.classList.toggle("close");
})

// Sub-menu close and open.
dropdown.forEach(submenu => {
    const select = sub-menu.querySelector(".select");
})

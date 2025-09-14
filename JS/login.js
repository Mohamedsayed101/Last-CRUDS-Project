let formIcons = document.querySelectorAll("form i");

let inputs = document.querySelectorAll("form input");

const loginForm = document.getElementById("loginForm");

let errorMsg = document.querySelector(".error-msg");

formIcons[0].addEventListener("click", () => {
  inputs[0].focus();
});
formIcons[1].addEventListener("click", () => {
  inputs[1].focus();
});
formIcons[2].addEventListener("click", () => {
  formIcons[2].classList.toggle("fa-eye");
  formIcons[2].classList.toggle("fa-eye-slash");
  inputs[1].type = inputs[1].type === "password" ? "text" : "password";
});

loginForm.addEventListener("submit", (e) => {
  const username = inputs[0].value.trim();
  const password = inputs[1].value.trim();

  if (username === "" || password === "") {
    errorMsg.style.display = "flex";
    e.preventDefault();
    if (username === "") inputs[0].focus();
    else inputs[1].focus();
    return;
  }
  errorMsg.style.display = "none";
  open("../index.html");
});

inputs.forEach((inp) => {
  inp.addEventListener("input", () => {
    if (errorMsg.style.display === "flex") errorMsg.style.display = "none";
  });
});

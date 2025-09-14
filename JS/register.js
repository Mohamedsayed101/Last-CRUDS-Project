let formIcons = document.querySelectorAll("form i");

let inputs = document.querySelectorAll("form input");

const loginForm = document.getElementById("loginForm");

const username = inputs[0];
const email = inputs[1];
const password = inputs[2];
const confirmPassword = inputs[3];

let usernameError = document.querySelector(".titleError");
let emailError = document.querySelector(".titleError");
let passwordError = document.querySelector(".priceError");
let confirmPasswordError = document.querySelector(".categoryError");
let AllError = document.querySelector(".AllError");

for (let i = 0; i < formIcons.length; i++) {
  formIcons[i].addEventListener("click", () => {
    if (formIcons[i] === document.querySelector("i[itemid='1']")) {
      formIcons[i + 1].addEventListener("click", () => {
        inputs[i + 1].focus();
      });
      i++;
    }
    inputs[i].focus();
  });
}

formIcons[3].addEventListener("click", () => {
  formIcons[3].classList.toggle("fa-eye");
  formIcons[3].classList.toggle("fa-eye-slash");
  inputs[2].type = inputs[2].type === "password" ? "text" : "password";
});
formIcons[5].addEventListener("click", () => {
  formIcons[5].classList.toggle("fa-eye");
  formIcons[5].classList.toggle("fa-eye-slash");
  inputs[3].type = inputs[3].type === "password" ? "text" : "password";
});

// Rest errors 
[username, emailError, password, confirmPassword].forEach((input) => {
  if (!input) return;
  input.addEventListener("input", () => {
    usernameError.innerHTML = "";
    emailError.innerHTML = "";
    passwordError.innerHTML = "";
    confirmPasswordError.innerHTML = "";
    AllError.innerHTML = "";
  });
});

// handle Errors
function handleErrors(n, e, pass,confirmPass) {
  titleError.innerHTML = "";
  priceError.innerHTML = "";
  categoryError.innerHTML = "";
  AllError.innerHTML = "";

  let valid = true;

  const trimmedUsername= String(tit).trim();
  const trimmedEmail = String(priceVal).trim();
  const trimmedPass = String(cate).trim();
  const trimmedConfirmPass = String(cate).trim();

  const numericPrice = Number(trimmedPrice);

  if (trimmedTitle === "" && trimmedPrice === "" && trimmedCate === "") {
    AllError.innerHTML = "Please fill in all inputs.";
    valid = false;
  }

  if (trimmedTitle === "") {
    titleError.innerHTML = "Title is required.";
    valid = false;
  }

  if (trimmedPrice === "" || isNaN(numericPrice) || numericPrice <= 0) {
    priceError.innerHTML = "Price is not valid.";
    valid = false;
  }

  if (trimmedCate === "") {
    categoryError.innerHTML = "Category is required.";
    valid = false;
  }

  return valid;
}

//submit form
loginForm.addEventListener("submit", (e) => {
  if (username === "" || password === "") {
    errorMsg.style.display = "flex";
    e.preventDefault();
    if (username === "") inputs[0].focus();
    else inputs[1].focus();
    return;
  }
  errorMsg.style.display = "none";
  open("../Pages/login.html");
});

inputs.forEach((inp) => {
  inp.addEventListener("input", () => {
    if (errorMsg.style.display === "flex") errorMsg.style.display = "none";
  });
});

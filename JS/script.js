let title = document.querySelector("#title");
let price = document.querySelector("#price");
let tax = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let total = document.getElementById("total");
let count = document.querySelector("#count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let table = document.querySelector("#proTable");
let tableBody = document.getElementById("tbody");

// Error elements
let titleError = document.querySelector(".titleError");
let priceError = document.querySelector(".priceError");
let categoryError = document.querySelector(".categoryError");
let AllError = document.querySelector(".AllError");

// clear error messages when user types
[title, price, category, tax, ads, discount].forEach((input) => {
  if (!input) return;
  input.addEventListener("input", () => {
    titleError.innerHTML = "";
    priceError.innerHTML = "";
    categoryError.innerHTML = "";
    AllError.innerHTML = "";
  });
});

let mood = "create";
let temp = 0;

// Calculate Total 
function getTotal() {
  const p = Number(price.value.trim()) || 0;
  const t = Number(tax.value.trim()) || 0;
  const a = Number(ads.value.trim()) || 0;
  const d = Number(discount.value.trim()) || 0;

  const totalVal = p + t + a - d;

  if (price.value.trim() !== "") {
    total.innerHTML = totalVal;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "";
  }

  return totalVal; 
}

// Handle Errors 
function handleErrors(tit, priceVal, cate) {
  titleError.innerHTML = "";
  priceError.innerHTML = "";
  categoryError.innerHTML = "";
  AllError.innerHTML = "";

  let valid = true;

  const trimmedTitle = String(tit).trim();
  const trimmedPrice = String(priceVal).trim();
  const trimmedCate = String(cate).trim();

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

// Local Storage 
let dataPro = [];
try {
  const raw = localStorage.getItem("product");
  dataPro = raw ? JSON.parse(raw) : [];
} catch (e) {
  dataPro = [];
}

// Submit 
submit.onclick = (e) => {
  e.preventDefault();

  if (!handleErrors(title.value, price.value, category.value)) return;

  const obj = {
    title: title.value.trim().toLowerCase(),
    price: price.value.trim(),
    taxes: tax.value.trim(),
    ads: ads.value.trim(),
    discount: discount.value.trim(),
    total: total.innerHTML,
    count: count.value.trim(),
    category: category.value.trim().toLowerCase(),
  };

  if (mood === "create") {
    const qty = Number(obj.count) || 1;
    if (qty > 1) {
      for (let i = 0; i < qty; i++) dataPro.push({ ...obj, count: "1" });
    } else {
      dataPro.push(obj);
    }
  } else {
    dataPro[temp] = obj;
    mood = "create";
    submit.innerHTML = "Create";
    count.style.display = "block";
  }

  localStorage.setItem("product", JSON.stringify(dataPro));
  clearData();
  showData();
};

// Clear Form 
function clearData() {
  title.value = "";
  price.value = "";
  tax.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";

  titleError.innerHTML = "";
  priceError.innerHTML = "";
  categoryError.innerHTML = "";
  AllError.innerHTML = "";
}

// Show Data 
function showData() {
  getTotal();
  let table = "";
  for (let index = 0; index < dataPro.length; index++) {
    const p = dataPro[index];
    table += `
      <tr>
        <td>${index + 1}</td>
        <td>${p.title}</td>
        <td>${p.price}</td>
        <td>${p.taxes || 0}</td>
        <td>${p.ads || 0}</td>
        <td>${p.discount || 0}</td>
        <td>${p.total}</td>
        <td>${p.category}</td>
        <td><button onclick="updataData(${index})">Update</button></td>
        <td><button onclick="deleteProduct(${index})">Delete</button></td>
      </tr>`;
  }
  tableBody.innerHTML = table;

  let btnDelete = document.getElementById("deleteAll");
  btnDelete.innerHTML =
    dataPro.length > 0
      ? `<button onclick="deleteAll()">Delete All (${dataPro.length})</button>`
      : "";

  if (dataPro.length === 0)
    tableBody.innerHTML = `
            <tr>
              <td colspan="10" class="notFound" style="text-align:center; padding:16px;">
                No Data To Display
              </td>
            </tr>

    `;
}
showData();

// Delete One 
function deleteProduct(i) {
  dataPro.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(dataPro));
  showData();
}

// Update 
function updataData(i) {
  let product = dataPro[i];
  title.value = product.title;
  price.value = product.price;
  tax.value = product.taxes;
  ads.value = product.ads;
  discount.value = product.discount;
  getTotal();
  count.style.display = "none";
  category.value = product.category;
  mood = "update";
  submit.innerHTML = "Update";
  temp = i;
  scroll({ top: 0, behavior: "smooth" });
}

// Delete All 
function deleteAll() {
  localStorage.removeItem("product");
  dataPro = [];
  showData();
  tableBody.innerHTML = `
        <tr>
            <td colspan="10" class="notFound" style="text-align:center; padding:16px;">
                No Data To Display
            </td>
        </tr>

  `;
}

// Search function 
let searchMood = "title";

function getSearchMood(id) {
  const search = document.getElementById("search");
  if (id === "searchByTitle") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search By Category";
  }
  search.focus();
  search.value = "";
  showData();
}

function makeRow(p, index) {
  return `
    <tr>
      <td>${index + 1}</td>
      <td>${p.title}</td>
      <td>${p.price}</td>
      <td>${p.taxes || 0}</td>
      <td>${p.ads || 0}</td>
      <td>${p.discount || 0}</td>
      <td>${p.total}</td>
      <td>${p.category}</td>
      <td><button onclick="updataData(${index})" id="updata">Update</button></td>
      <td><button onclick="deleteProduct(${index})" id="delete">Delete</button></td>
    </tr>
  `;
}

function searchData(val) {
  const q = String(val || "").trim().toLowerCase();
  
  if (!q) {
    showData();
    return;
  }

  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    const title = (dataPro[i].title || "").toString().toLowerCase();
    const category = (dataPro[i].category || "").toString().toLowerCase();

    if ((searchMood === "title" && title.includes(q)) ||
        (searchMood === "category" && category.includes(q))) {
      table += makeRow(dataPro[i], i);
    }
  }

  tableBody.innerHTML = table || `<tr><td colspan="10" class="notFound">No results</td></tr>`;
}


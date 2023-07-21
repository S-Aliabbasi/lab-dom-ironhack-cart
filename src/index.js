// ITERATION 1

function updateSubtotal(product) {
  const priceclass = product.getElementsByClassName("price");
  const quantityclass = product.getElementsByClassName("quantity");
  const subtotalclass = product.getElementsByClassName("subtotal");

  // Access price quantity subtotal
  let price = priceclass[0].getElementsByTagName("span");
  let quantity = quantityclass[0].getElementsByTagName("input");
  let subtotal = subtotalclass[0].getElementsByTagName("span");
  subtotal[0].innerText = price[0].innerText * quantity[0].value;
}

function calculateAll() {
  const productElement = document.getElementsByClassName("product");

  // Calculate prices for each row
  for (i = 0; i < productElement.length; i++) {
    updateSubtotal(productElement[i]);
  }

  // Calculate the total price for table
  const SubtotalTemp = document.getElementsByClassName("subtotal");
  let sum = 0;
  for (i = 0; i < SubtotalTemp.length; i++) {
    const allSubtotal = SubtotalTemp[i].getElementsByTagName("span");
    if (typeof allSubtotal[0].innerHTML == "string") {
      sum += Number(allSubtotal[0].innerHTML);
    } else sum = 0;
  }
  const total = document.querySelector("#total-value span");
  total.innerHTML = sum;
}

function removeProduct(event) {
  const target = event.currentTarget;
  const productNode = target.parentNode.parentNode;
  const parentProduct = target.parentNode.parentNode.parentNode;
  parentProduct.removeChild(productNode);
}

// ITERATION 5

function createProduct() {
  // Get new prodoct name and price
  let productName;
  let productPrice;

  const inputs = document.querySelectorAll(".create-product input");
  inputs.forEach((child) => {
    if (child.getAttribute("type") == "text") {
      productName = child.value;
      child.value = "";
    }
    if (child.getAttribute("type") == "number") {
      productPrice = child.value;
      child.value = "0";
    }
  });

  // Create new prodoct row

  const tableElement = document.querySelector("tbody");
  const newElement = document.createElement("tr");
  newElement.innerHTML = `<tr class="product">
           <td class="name">
             <span>${productName}</span>
           </td>
           <td class="price">$<span>${productPrice}</span></td>
           <td class="quantity">
             <input type="number" value="0" min="0" placeholder="Quantity" />
           </td>
           <td class="subtotal">$<span>0</span></td>
           <td class="action">
             <button class="btn btn-remove">Remove</button>
           </td>
         </tr>`;
  tableElement.appendChild(newElement);
  const tbody = document.getElementsByTagName("tbody");
  const rows = tbody[0].getElementsByTagName("tr");
  for (i = 0; i < rows.length; i++) {
    if (!rows[i].classList.contains("product"))
      rows[i].classList.add("product");
  }

  // If remove btn press
  const removeBtn = document.getElementsByClassName("btn-remove");
  for (i = 0; i < removeBtn.length; i++) {
    removeBtn[i].addEventListener("click", removeProduct);
  }
}

window.addEventListener("load", () => {
  const calculatePricesBtn = document.getElementById("calculate");
  calculatePricesBtn.addEventListener("click", calculateAll);

  // If click create btn
  const createBtn = document.getElementById("create");
  createBtn.addEventListener("click", createProduct);
});

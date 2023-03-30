const label = document.querySelector("#label");
const shoppingCart = document.querySelector("#shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

const calculation = () => {
  const cartIcon = document.querySelector("#cartAmount");
  const cartAmount = basket.map((x) => x.item);
  cartIcon.innerHTML = cartAmount.reduce((total, curr) => total + curr, 0);
};

calculation();

const generateCartItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        const { id, item } = x;
        const search = shopItemsData.find((y) => y.id === id) || [];
        return `
        <div class="cart-item">
            <img width="100" src=${search.img} alt=${search.name} />
            <div class="details">
                <div class="title-price-x">
                    <h4>
                        <p>${search.name}</p>
                        <span>$ ${search.price}</span>
                    </h4>
                    <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                </div>

                <div class="cart-buttons">
                    <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">${item}</div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
                </div>
                <h3>
                $ ${item * search.price}
                </h3>
            </div>
        </div>
        `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
    <button class="homeBtn">Back to Home</button>
    </a>
    `;
  }
};

generateCartItems();

const increment = (id) => {
  let selectedItem = id;
  const search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

const decrement = (id) => {
  let selectedItem = id;
  const search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);

  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

const update = (id) => {
  const search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalAmount();
};

const removeItem = (id) => {
  const selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  totalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

const totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        const { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((total, curr) => total + curr, 0);
    label.innerHTML = `
      <h2>Total Bill: $ ${amount}</h2>
      <button class="checkout">Checkout</button>
      <button class="removeAll">Clear Cart</button>
      `;
  } else return;
};

totalAmount();

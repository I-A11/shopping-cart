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
                <div class="title-price-x"></div>

                <div class="cart-buttons"></div>
                <h3></h3>
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

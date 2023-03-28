let basket = JSON.parse(localStorage.getItem("data")) || [];

const calculation = () => {
  const cartIcon = document.querySelector("#cartAmount");
  const cartAmount = basket.map((x) => x.item);
  cartIcon.innerHTML = cartAmount.reduce((total, curr) => total + curr, 0);
};

calculation();

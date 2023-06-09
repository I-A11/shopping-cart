const shop = document.querySelector("#shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

const generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((item) => {
      const { id, img, name, desc, price } = item;
      const search = basket.find((x) => x.id === id) || [];
      return `
      <div id=product-id-${id} class="item">
        <img src=${img} alt=${name} />
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}.</p>
          <div class="price-quantity">
            <h2>$ ${price}</h2>
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">
              ${search.item === undefined ? 0 : search.item}
              </div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join(""));
};

generateShop();

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

  localStorage.setItem("data", JSON.stringify(basket));
};

const update = (id) => {
  const search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

const calculation = () => {
  const cartIcon = document.querySelector("#cartAmount");
  const cartAmount = basket.map((x) => x.item);
  cartIcon.innerHTML = cartAmount.reduce((total, curr) => total + curr, 0);
};

calculation();

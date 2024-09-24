  const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35
    }
  ],
  cart: []
};

function RenderBobsStore() {
  const storeItems = document.querySelector('.store--item-list')
  storeItems.innerHTML = ''

  state.items.forEach(item => {
    const li = document.createElement('li')
    const div = document.createElement('div')
    div.className = 'store--item-icon'

    const image = document.createElement('img')
    image.src = `assets/icons/${item.id}.svg`;
    image.alt = item.name

    div.appendChild(image)

    const btn = document.createElement('button')
    btn.onclick = () => AddItemToCart(item.id)
    btn.textContent = 'Add to cart'
    
    li.appendChild(div)
    li.appendChild(btn)

    storeItems.appendChild(li)
  })
}

function AddItemToCart(id) {
  const item =  state.items.find(i => i.id === id)
  const cItem = state.cart.find(c => c.id === id)
  if(!cItem) {
    state.cart.push({...item, quantity: 1})
  } else {
    cItem.quantity++
  }
  RenderCart()
}

function RenderCart() {
  const container = document.querySelector('.cart--item-list')
  container.innerHTML = ''

  state.cart.forEach(cItem => {
    const li = document.createElement('li')

    const image = document.createElement('img')
    image.alt = cItem.name;
    image.className = 'cart--item-icon';
    image.src = `assets/icons/${cItem.id}.svg`;
    
    const p = document.createElement('p')
    p.textContent = cItem.name

    const quantity = document.createElement('span')
    quantity.className = 'quantity-text center'
    quantity.textContent = cItem.quantity

    const incBtn = document.createElement('button')
    incBtn.className = 'quantity-btn add-btn center'
    incBtn.textContent = '+'
    incBtn.onclick = () => QuantityIncrease(cItem.id)

    const decBtn = document.createElement('button')
    decBtn.className = 'quantity-btn remove-btn center'
    decBtn.textContent = '-'
    decBtn.onclick = () => QuantityDecrease(cItem.id)

    li.appendChild(image)
    li.appendChild(p)
    li.appendChild(quantity)
    li.appendChild(incBtn)
    li.append(decBtn)
    

    container.appendChild(li)
  })
  TotalCartUpdate()
};

function QuantityIncrease(id) {
  const cItem = state.cart.find(i => i.id === id)
  cItem.quantity++
  RenderCart()
}

function QuantityDecrease(id) {
  const cItem = state.cart.find(i => i.id === id)
  cItem.quantity--
  if(cItem.quantity === 0) {
    state.cart = state.cart.filter(c => c.id !== id);
  }
  RenderCart()
}

function TotalCartUpdate() {
  const amount = state.cart.reduce((sum, cItem) => sum + cItem.price * cItem.quantity, 0)
  document.querySelector('.total-number').innerText  = '£' + amount.toFixed(2)
}

RenderBobsStore()
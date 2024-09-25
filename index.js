  const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.15,
      type: 1
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.45,
      type: 1
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.25,
      type: 2
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.75,
      type: 2
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.32,
      type: 2
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.17,
      type: 2
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.92,
      type: 1
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.10,
      type: 2
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.02,
      type: 2
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.42,
      type: 1
    }
  ],
  cart: [],
  filter: 0,
  sort: 0
};
const filterSort = document.querySelector('.filtersAndSortings');

function RenderBobsStore() {
  const storeItems = document.querySelector('.store--item-list')
  storeItems.innerHTML = ''

  FilterSortList().forEach(item => {
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
    
    const p = document.createElement('p');
    p.textContent = `£${item.price}`;

    li.appendChild(div)
    li.appendChild(btn)
    li.appendChild(p);

    storeItems.appendChild(li)
  })
  const li = document.createElement('li');

  const txt = document.createElement('textarea');
  txt.className = 'newItem'
  txt.value = 'id: 011,\nname: Watermelon,\nprice: 1.35,\ntype: 2';

  const btn = document.createElement('button');
  btn.textContent = 'Add new item to store';
  btn.onclick = () => AddItem(txt.value);

  li.appendChild(txt);
  li.appendChild(btn);

  storeItems.appendChild(li);
}

function AddItem(info) {
  
  const object = info.split(',\n').reduce((buildingObject, priceTypeValue) => {
    const [k, v] = priceTypeValue.split(': ').map(item => item.trim())
    
    if (k === 'type') {
      buildingObject[k] = parseInt(v, 10)
    } else if (k === 'price') {
      buildingObject[k] = parseFloat(v)
    } else {
      buildingObject[k] = v
    }
    return buildingObject
  }, {})
  if (state.items.find(i => i.id === object.id) != null) {
    return null
  }
  state.items.push(object)
  
  RenderBobsStore()
}

function FilterAndSort() {
  filterSort.innerHTML = ''

  const div = document.createElement('div')
  div.className = 'filterSort'

  const filterBtn = document.createElement('btn')
  filterBtn.className = 'filterBtn'
  filterBtn.textContent = Filter()
  filterBtn.onclick = () => FilterToggle()

  const sortBtn = document.createElement('btn')
  sortBtn.className = 'SortBtn'
  sortBtn.textContent = Sort()
  sortBtn.onclick = () => SortToggle()

  filterSort.appendChild(div)
  filterSort.appendChild(filterBtn)
  filterSort.appendChild(sortBtn)

  RenderBobsStore()
}

function Filter() {
  if (state.filter === 0) {
    return 'All'
  } else if (state.filter === 1) {
    return 'Vegetables'
  } else if (state.filter === 2) {
    return 'Fruits'
  }
}

function FilterToggle() {
  state.filter++
  if(state.filter > 2) {
    state.filter = 0
  }
  FilterAndSort()
}

function Sort() {
  if (state.sort === 0) {
    return 'None'
  } else if (state.sort === 1) {
    return 'Price'
  } else if (state.sort === 2) {
    return 'Alphabetically'
  }
}

function SortToggle() {
  state.sort++
  if(state.sort > 2) {
    state.sort = 0
  }
  FilterAndSort()
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

    TotalCartUpdate()
  })

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

function FilterSortList() {
  const filerType = state.filter
  const sortType = state.sort
  if(filerType === 0) {
    if(sortType === 0) {
      return state.items
    } else if (sortType === 1) {
      return [...state.items].sort((x, y) => x.price - y.price)
    } else if (sortType === 2) {
      return [...state.items].sort((x, y) => x.name.localeCompare(y.name));
    }
  } else if(filerType === 1) {
    if(sortType === 0) {
      return state.items.filter(i => i.type === 1)
    } else if (sortType === 1) {
      return [...state.items.filter(i => i.type === 1)].sort((x, y) => x.price - y.price);
    } else if (sortType === 2) {
      return [...state.items.filter(i => i.type === 1)].sort((x, y) => x.name.localeCompare(y.name));
    }
  } else if(filerType === 2) {
    if(sortType === 0) {
      return state.items.filter(i => i.type === 2)
    } else if (sortType === 1) {
      return [...state.items.filter(i => i.type === 2)].sort((x, y) => x.price - y.price);
    } else if (sortType === 2) {
      return [...state.items.filter(i => i.type === 2)].sort((x, y) => x.name.localeCompare(y.name));
    }
  }
}



document.addEventListener('DOMContentLoaded', () => {
  FilterAndSort();
})

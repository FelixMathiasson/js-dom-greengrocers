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
    btn.textContent = 'Add to cart'
    
    li.appendChild(div)
    li.appendChild(btn)

    storeItems.appendChild(li)
  })
}

RenderBobsStore()
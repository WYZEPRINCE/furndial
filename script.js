
const cartButton = document.querySelector('.add-to-cart');
const cartContainer = document.querySelector('.cart-container');
const cartItems = document.querySelector('.cart-body');
const checkoutButton = document.querySelector('.confirm-payment');
const categoriesContainer = document.querySelector('.collection-container');
const getProduct = document.querySelector('#get-product')

// Cart array
let cart = [];

// Categories array
let categories = [];

// Fetch products from API
fetch('(https://fakeapi.platzi.com/)')
  .then(response => response.json())
  .then(products => {
    // Render products
    products.forEach(product => {
      const productHTML = `
        <div class="product-card">
                    <div class="card-header">
                        <p>-10%</p>
                        <img src="./images/Group 2227.png" alt="favorite icon" id="fav-btn">
                    </div>
                       <div>
                       <a id="get-product" href="./productdetail.html"><img src="./images/vecteezy_ai-generated-round-wooden-vintage-table-clip-art_34969359.png" alt="round-wooden-vintage-table"></a>
                       </div>
                       <div class="p_card-footer">
                           <div>
                               <p>${product.title}</p>
                               <h5>#${product.price}<span>${product.category}</span></h5>
                           </div>
                        
                        <img src="${product.image.png}">
                       </div>
                </div>
      `;
      document.querySelector('.product-card').innerHTML += productHTML;

      
      if (!categories.includes(product.category)) {
        categories.push(product.category);
      }
    });

    // Render categories
    categories.forEach(category => {
      const categoryHTML = `
        <div class="collection-card">
               <div class="card-header">
                <p>${categories}</p>
                <p> 6 colors</p>
               </div>
               <div>
                <img src="./images/vecteezy_ai-generated-round-wooden-vintage-table-clip-art_34969359.png" alt="round-wooden-vintage-table">
               </div>
               <div class="card-footer">
                <div>
                    <p>Vintage Table</p>
                <h5>#102,000</h5>
                </div>
                <div>
                    <img class="add-to-cart" src="./images/mdi_cart.png" alt="add to cart">
                </div>                
               </div>
            </div>
      `;
      categoriesContainer.innerHTML += categoryHTML;
    });

    // Add event listeners to add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', addToCart);
    });
  });

// Add to cart functionality
function addToCart(event) {
  const productId = event.target.dataset.productId;
  const productCategory = event.target.dataset.productCategory;
  const product = cart.find(product => (api.escuelajs.co/api/v1/products) === productId);

  if (product) {
    // Update quantity
    product.quantity++;
  } else {
    // Add new product to cart
    cart.push({
      id: productId,
      quantity: 1,
      category: productCategory
    });
  }

  renderCart();
}

// Render cart
function renderCart() {
  cartItems.innerHTML = '';
  cart.forEach(item => {
    const productHTML = `
      <div class="cart-body">
                <div class="cart-body-img">
                    <img src="${item.image.png}">
                    <p>${item.title}</p>
                </div>
                

                <div class="body-content">
                    <p>${item.price}</p>
                    <div class="cart-update-carousel">
                        <img class="update-quantity"${api.escuelajs.co/api/v1/products}src="./images/Frame 2247.png" alt="plus icon">
                        <p>01</p>
                        <img class="update-quantity"${api.escuelajs.co/api/v1/products} src="./images/Frame 2246.png" alt="minus icon">
                    </div>
                    <p>Subtotal</p>
                    <img class="remove-item" class="remove-item" data-product-id="${api.escuelajs.co/api/v1/products}"src="./images/Frame 2245.png" alt="">
                </div>

            </div>
    `;
    cartItems.innerHTML += productHTML;
  });

  // Add event listeners to update quantity and remove item buttons
  document.querySelectorAll('.update-quantity').forEach(button => {
    button.addEventListener('click', updateQuantity);
  });
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', removeItem);
  });
}

// Update quantity functionality
function updateQuantity(event) {
  const productId = event.target.dataset.productId;
  const product = cart.find(product => (api.escuelajs.co/api/v1/products) === productId);
  if (product) {
    product.quantity = parseInt(prompt('Enter new quantity:'));
    renderCart();
  }
}

// Remove item functionality
function removeItem(event) {
  const productId = event.target.dataset.productId;
  cart = cart.filter(product => (api.escuelajs.co/api/v1/products) !== productId);
  renderCart();
}

// Place order functionality
checkoutButton.addEventListener('click', placeOrder);

function placeOrder() {
  // Send request to API to place order
  fetch('https://api.escuelajs.co/api/v1/products/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      products: cart
    }),
  })
    .then(response => response.json())
    .then(order => {
      console.log(order);
      // Render order confirmation
      const orderHTML = `
        <div class="order-summary3">
        <div class="summary-head">
            <p> Order Summary</p>
        </div>

        <div class="summary-body">
            <p>Order Number</p>
            <p>${api.escuelajs.co/api/v1/products} </p>
        </div>
        <div class="summary-body">
            <p>Date</p>
            <p>July 20, 2024</p>
        </div>
        <div class="summary-body">
            <p>Item Purchased</p>
            <p>3 items</p>
        </div>

        <div class="summary-body-total2">
            <p>Total</p>
            <p>#${order.total}</p>
        </div>
        <a href="./checkout.html"><button>View order details</button></a>
    </div>
      `;
      document.querySelector('#order-confirmation').innerHTML = orderHTML;
    });
}


// Function to get product details
function getProductDetails(productId) {
  fetch('https://api.escuelajs.co/api/v1/products/')
    .then(response => response.json())
    .then(product => {
      console.log(product);
      // Render product details
      const productDetailsHTML = `
        <div class="d-text-container">
            <p class="detail-discount-text"><b>Save #20,000</b></p>
            <h5 class="name">${product.title}</h5>
            <h4 class="Description">${product.description}</h4><br>
            <h3 class="price">${product.price}</h3> <span>${product.category}</span>
            <span><h5>Product code : 002056</h5> <h5><ul>
                <li>In stock</li>
            </ul></h5></span>
            <span><h5>140 Reviews |</h5> <h5>431pcs sold</h5></span><br>

            <div class="cart-update-carousel2">
                <img src="./images/Frame 2247.png" alt="plus icon">
                <p>01</p>
                <img src="./images/Frame 2246.png" alt="minus icon">
            </div>

            <div class="details-cta">
                <button>Buy Now</button>
                <button class="add-to-cart data-product-id="${api.escuelajs.co/api/v1/products}" data-product-category="${product.category}">Add to Cart</button>
                <img src="./images/Group 2227.png" alt="">
            </div>
        </div>
      `;
      document.querySelector('.product-details-container').innerHTML = productDetailsHTML;
    });
}

// Add event listener to product links
document.querySelectorAll('.get-product').forEach(product => {
  product.addEventListener('click', event => {
    const productId = event.target.dataset.productId;
    getProductDetails(productId);
  });
});

function toggleMenu() {
  var menuContent = document.querySelector('.menu-content');
  menuContent.classList.toggle('show-menu-content');
}
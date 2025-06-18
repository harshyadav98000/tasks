const productList = document.getElementById('productList');
const searchBar = document.getElementById('searchBar');
let products = [];

async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    products = data;
    displayProducts(products);
  } catch (error) {
    productList.innerHTML = "<p>Error loading products.</p>";
    console.error("Failed to fetch products:", error);
  }
}

function displayProducts(filteredProducts) {
  productList.innerHTML = '';
  filteredProducts.forEach(product => {
    const div = document.createElement('div');
    div.classList.add('product');
    div.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
    `;
    productList.appendChild(div);
  });
}


searchBar.addEventListener('input', () => {
  const searchTerm = searchBar.value.toLowerCase();
  const filtered = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm)
  );
  displayProducts(filtered);
});

fetchProducts();

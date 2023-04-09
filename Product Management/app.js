const firebaseConfig = {
    apiKey: "AIzaSyB3jQ4yPgUa_qRihZuxlMa6me9Z2eZZiFw",
    authDomain: "gym-management-project-55289.firebaseapp.com",
    databaseURL: "https://gym-management-project-55289-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "gym-management-project-55289",
    storageBucket: "gym-management-project-55289.appspot.com",
    messagingSenderId: "787800355187",
    appId: "1:787800355187:web:6645726d133202469a5506",
    measurementId: "G-9C8EKQQ4G5"
  };

  firebase.initializeApp(firebaseConfig);

  // Initial Database
  const database = firebase.database();

  // Get products

  const productsRef = database.ref('products');
  const productList = document.querySelector('#products-list');

  // Create new product
  
  const createProduct = (name, description, price, imageUrl) => {
    const newProductRef = productsRef.push();

    newProductRef.set({
        name: name,
        description: description,
        price: price,
        imageUrl: imageUrl,
    });
};

//Edit Product
const editProduct = (key, product) => {
    const name = prompt('Enter new product name', product.name);
    const description = prompt('Enter new product description', product.description);
    const price = prompt('Enter new product price', product.price);
    const imageUrl = prompt('Enter new product image url', product.imageUrl);

    productsRef.child(key).update({
        name: name,
        description: description,
        price: price,
        imageUrl: imageUrl,
    });
};

// Delete product
const deleteProduct = (key) => {
    const confirmation = confirm('Are you sure to delete this product?');

    if(confirmation === true){
        productsRef.child(key).remove();
    }
}

// Handle form submit
const form = document.querySelector('#product-form');
const nameInput = document.querySelector('#name');
const descriptionInput = document.querySelector('#description');
const priceInput = document.querySelector('#price');
const imageUrlInput = document.querySelector('#image');

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    createProduct(nameInput.value, descriptionInput.value, priceInput.value, imageUrlInput.value);
    form.reset; // Clear form
    nameInput.value = '';
    descriptionInput.value = '';
    priceInput.value = '';
    imageUrlInput.value = '';
});

productsRef.on('child_added', (snapshot) => {
    const product = snapshot.val();
    const key = snapshot.key;
    
    // Create product element
    const productEl = document.createElement('div');
    productEl.classList.add('col', 'col-6');

    // Create product image element
    const productImageEl = document.createElement('img');
    productImageEl.src = product.imageUrl;
    productImageEl.alt = product.name;
    productEl.appendChild(productImageEl);

    // Create product name element
    const productNameEl = document.createElement('h3');
    productNameEl.textContent = product.name;
    productEl.appendChild(productNameEl);

    // Create product description element
    const productDescriptionEl = document.createElement('p');
    productDescriptionEl.textContent = product.description;
    productEl.appendChild(productDescriptionEl);

    // Create product price element
    const productPriceEl = document.createElement('p');
    productPriceEl.textContent = product.price;
    productEl.appendChild(productPriceEl);

    //Create edit and delete button element
    const editBtnElement = document.createElement('button');
    editBtnElement.textContent = 'Edit';
    editBtnElement.classList.add('edit');
    editBtnElement.addEventListener('click', () => {
        editProduct(key, product);
    });
    productEl.appendChild(editBtnElement);

    const deleteBtnElement = document.createElement('button');
    deleteBtnElement.textContent = 'Delete';
    deleteBtnElement.classList.add('delete');
    deleteBtnElement.addEventListener('click', () => {
        deleteProduct(key);
        location.reload();
    });
    productEl.appendChild(deleteBtnElement);

    //Append product element to product list 
    productList.appendChild(productEl);
});
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("User is signed in");
    } else {
      // User is signed out.
      console.log("User is signed out");
    }
  });

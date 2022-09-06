const producten = document.querySelector('.producten');
const body = document.querySelector('BODY');
const page = body.dataset.location;
const productHeader = document.querySelector('.productHeader');

function getProducts() {
    
    fetch(`https://fakestoreapi.com/${page}`)
    .then(res=>res.json())
    .then(data => showProducts(data))
    .catch(error => {
        console.error("There was a problem loading the products", error);
        handleError();
    })
}

function showProducts(products) {
    products.map(product => producten.innerHTML += `
        <div class="product" >
            <div class="imageHolder">
                <img src="${product.image}" alt="product">
                <button data-id="${product.id}" class="addButton">GO</button>
            </div>
            <div class="productDescription"> 
                <p className="productTitle">${product.title}</p>
                <p>${product.price.toFixed(2)},-</p>
            </div>
        </div>     
   `)
   addListener();
}
function handleError() {
    producten.innerHTML = 'It looks like something went wrong while loading the products :('
}
if (page !== 'carts') {
    getProducts();
} else {
    const cart = JSON.parse(localStorage.getItem('cart'));
    
    if (localStorage.length === 0) {
        producten.innerHTML = "Uw winkelwagen is leeg";
    } else {
        cart.map(id => {
            fetch(`https://fakestoreapi.com/products/${id}`)
                .then(res=>res.json())
                .then(product=> {producten.innerHTML += `
                    <div class="product" >
                    <div class="imageHolder">
                        <img src="${product.image}" alt="product">
                    </div>
                    <div class="productDescription"> 
                        <p className="productTitle">${product.title}</p>
                        <p>${product.price.toFixed(2)},-</p>
                    </div>
                </div>  
                `})
        });
    }
    
    const clearCart = document.querySelector('.clearCart');
    clearCart.addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    })
}

// Show single product
function getSingleProduct(id) {
    fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(data => showSingleProduct(data))
            .catch(error => console.error("There was a problem", error))
}

const singleProductPage = document.querySelector('.singleProductPage');
const promoSection = document.querySelector('.promoSection');

function showSingleProduct(product) {
    
    singleProductPage.style.display = "block";
    scroll();
    
    singleProductPage.innerHTML = `
        <button class="terug">Sluit</button>
        <div class="singleProduct" >
            
            <div class="singleImageHolder">
                <img src="${product.image}" alt="product">
            </div>
            <div class="singleProductDescription"> 
                
                <p class="singleProductTitle">${product.title}</p>
                <p class="description">${product.description}</p>
                <p class="singlePrice">${product.price.toFixed(2)},-</p>
                
                <button data-id="${[product.id]}" class="addCart">Voeg toe aan winkelwagen
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18C9.82843 18 10.5 18.6716 10.5 19.5C10.5 20.3284 9.82843 21 9 21C8.17157 21 7.5 20.3284 7.5 19.5C7.5 18.6716 8.17157 18 9 18Z" stroke="#ffffff" stroke-width="1.5"/>
                        <path d="M16 18C16.8284 18 17.5 18.6716 17.5 19.5C17.5 20.3284 16.8284 21 16 21C15.1716 21 14.5 20.3284 14.5 19.5C14.5 18.6716 15.1716 18 16 18Z" stroke="#ffffff" stroke-width="1.5"/>
                        <path d="M5.75 12C5.75 10.5646 5.75159 9.56347 5.85315 8.80812C5.9518 8.07434 6.13225 7.68577 6.40901 7.40901C6.68577 7.13225 7.07434 6.9518 7.80812 6.85315C8.56347 6.75159 9.56458 6.75 11 6.75H13.9172C15.5841 6.75 16.7537 6.75179 17.623 6.87517C18.4715 6.9956 18.8954 7.21511 19.1754 7.54566C19.4554 7.8762 19.6023 8.33044 19.5816 9.18719C19.5604 10.0649 19.3698 11.2189 19.0958 12.8631C18.8931 14.0793 18.7511 14.9228 18.5629 15.5551C18.3807 16.1672 18.1794 16.4911 17.913 16.7168C17.6465 16.9425 17.294 17.0878 16.6602 17.1669C16.0056 17.2486 15.1503 17.25 13.9172 17.25H11C9.56458 17.25 8.56347 17.2484 7.80812 17.1469C7.07434 17.0482 6.68577 16.8678 6.40901 16.591C6.13225 16.3142 5.9518 15.9257 5.85315 15.1919C5.75159 14.4365 5.75 13.4354 5.75 12Z" stroke="#ffffff" stroke-width="1.5"/>
                        <path d="M5.75 11.5V5C5.75 3.89543 4.85457 3 3.75 3H2.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>
        </div>     
    `
    const terug = document.querySelector('.terug');
    terug.addEventListener('click', () => {
        singleProductPage.style.display = "none"
    })

    const addCartButton = document.querySelector('.addCart');
    addCartButton.addEventListener('click', () => {
        addCart(addCartButton.dataset.id);
    })
}
function addListener() {
    const addButtons = document.querySelectorAll('.addButton');
    for (let i = 0; i < addButtons.length; i++) {
        addButtons[i].addEventListener('click', () => {
            getSingleProduct(addButtons[i].dataset.id)
        })
    }
}
function scroll() {
    
    if (page === 'products') {
        const offset = promoSection.offsetHeight;
        window.scrollTo(0, offset);
    }
    else {
        window.scrollTo(0,0)
    }
}
// HamburgerMenu
const hamburgerMenu = document.querySelector('.hamburgerMenu');
const hamburgerIcon = document.querySelector('.menuIcon');

hamburgerIcon.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('hActive');
    search.classList.add('hideSearch');
})

// Searcharea and function
const search = document.querySelector('.searchArea');
const searchIcon = document.querySelector('.searchIcon');
const clearIcon = document.querySelector('.clear');
const searchInput = document.querySelector('.searchInput');

searchIcon.addEventListener('click', () => {
    search.classList.toggle('hideSearch');
})
clearIcon.addEventListener('click', () => {
    searchInput.value = '';
    handleSearch("");
})
search.addEventListener('keyup', (event) => {
    handleSearch(event.target.value);
});

function handleSearch(searchString) {
    const productTitles = document.querySelectorAll('.productDescription');
    productTitles.forEach(title => {
        if(title.firstElementChild.innerHTML.toLowerCase().includes(searchString.toLowerCase())) {
            title.parentElement.style.display = "block";
        } else {
            title.parentElement.style.display = "none";
        };
    });
}

// Go button
const ontdek = document.querySelector('.ontdekButton');
if (page === 'products') {
    ontdek.addEventListener('click', () => {
        productHeader.scrollIntoView();
    })
}

if (page === "products") {
    const goButton = document.querySelector('.goButton');
    goButton.addEventListener('click', () => {
        getSingleProduct(1);
    });
}

// Add to Cart 
function addCart(id) {
   
    if (window.localStorage.length === 0) {
        localStorage.setItem("cart", JSON.stringify([id]));
    } else {
        let updateArray = JSON.parse(localStorage.getItem('cart'));
        if(!updateArray.includes(id)) {
            updateArray.push(id);
        }
        localStorage.setItem("cart", JSON.stringify(updateArray));
        console.log(localStorage.cart);  
    }
}
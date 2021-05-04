// Add to cart button and shopping cart number //
let carts = document.querySelectorAll('.addcart');

let products = [
	{
		name: 'MAC 988',
		tag: 'MAC_988',
		price: 22.00,
		inCart: 0
	},
	{
		name: 'Counture Blush',
		tag: 'Counture_Blush',
		price: 42.00,
		inCart: 0
	},
	{
		name: 'Satin Crush Mono Eyeshadow',
		tag: 'Satin_Crush_Mono_Eyeshadow',
		price: 30.00,
		inCart: 0
	},
	{
		name: 'Forever Perfect Fix',
		tag: 'Forever_Perfect_Fix',
		price: 42.00,
		inCart: 0
	},
	{
		name: 'Diorshow Iconic Overcurl Waterproof',
		tag: 'Diorshow_Iconic_Overcurl_Waterproof',
		price: 29.50,
		inCart: 0
	},
	{
		name: 'Sérum De Beauté Fluide Soyeux Primer',
		tag: 'Sérum_De_Beauté_Fluide_Soyeux_Primer',
		price: 57.00,
		inCart: 0
	},
	{
		name: '318 Synthetic Retractable Lip Brush',
		tag: '318_Synthetic_Retractable_Lip_Brush',
		price: 24.00,
		inCart: 0
	},
	{
		name: 'Crayon Définition Sourcils Eyebrow Pencil',
		tag: 'Crayon_Définition_Sourcils_Eyebrow_Pencil',
		price: 32.00,
		inCart: 0
	},
	{
		name: 'Nail Glow',
		tag: 'Nail_Glow',
		price: 28.00,
		inCart: 0
	},
	{
		name: 'LHOMME Le Parfum',
		tag: 'LHOMME_Parfum',
		price: 118.00,
		inCart: 0
	},
	{
		name: 'Studio Fix Perfecting Stick',
		tag: 'Studio Fix Perfecting Stick',
		price: 20,
		inCart: 0
	},
	{
		name: 'Hortus Sanitatis Parfum',
		tag: 'Hortus_Sanitatis_Parfum',
		price: 330.00,
		inCart: 0
	}
];

for (let i=0; i < carts.length; i++) {
	carts[i].addEventListener('click', () => {
		cartNumbers(products[i]);
		totalCost(products[i]);
	})
}

function onLoadCartNumbers() {
	let productNumbers = localStorage.getItem('cartNumbers');

	if(productNumbers){
		document.querySelector('.cart span').textContent = productNumbers;
	}
}

function cartNumbers(product) {
	
	let productNumbers = localStorage.getItem('cartNumbers');
	
	productNumbers = parseInt(productNumbers);

	if(productNumbers) {
		localStorage.setItem('cartNumbers', productNumbers + 1);
		document.querySelector('.cart span').textContent = productNumbers + 1;
	} else {
		localStorage.setItem('cartNumbers', 1);
		document.querySelector('.cart span').textContent = 1;
	}

	setItems(product);
}

function setItems(product){
	let cartItems = localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems);

	if(cartItems != null) {
		
		if(cartItems[product.tag] == undefined) {
			cartItems = {
				...cartItems,
				[product.tag]: product
			}
		}
		cartItems[product.tag].inCart += 1;
	} else {
		product.inCart = 1;

		cartItems = {
			[product.tag]: product
		}
	}
	localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
	// console.log("product price", product.price);
	// problem with first price being object when it should be a string
	let cartCost = localStorage.getItem('totalCost');
	
	console.log("My cartCost is", cartCost);
	console.log(typeof cartCost );

	if(cartCost != null) {
		cartCost = parseInt(cartCost);
		localStorage.setItem("totalCost", cartCost + product.price);
	} else {
		localStorage.setItem("totalCost", product.price);
	}
	
}

function displayCart(){
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	let productContainer =document.querySelector(".products");
	let cartCost = localStorage.getItem('totalCost');

	if(cartItems && productContainer) {
		productContainer.innerHTML = '';
		Object.values(cartItems).map(item => {
			productContainer.innerHTML += `
			<div class="product">
				<img src="./images/${item.tag}.jpg">
				<span>${item.name}</span>
				<button class="remove-btn">Remove</button>
			</div>
			<div class="quantity">
			<h4 class="quantity">
			Quantity
			</h4>
				<span>${item.inCart}</span>
			</div>
			<div class="price">
			<h4 class="Price">
			Price
			</h4>
			$${item.price},00
			</div>
			<div class="total">
			<h4 class="BasketTotal">
			Total
			</h4>
				$${item.inCart * item.price},00
			</div>
			`
		});
		
		productContainer.innerHTML += `
			<div class="basketTotalContainer">
				<h4 class="basketTotal">
					Basket Total
				</h4>
				<h4 class="basketTotal">
					$${cartCost}, 00
				</h4>
				<button class="Purchase-button" type="button">Purchase</button>
				<br>
				<h4 class="basketTotal">
					VAT Included
				</h4>
		`
	}
}


onLoadCartNumbers();
displayCart();

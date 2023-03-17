// ACCESS TOKEN: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MGNkYWY4MWI0MjAwMTM5YjI3YjgiLCJpYXQiOjE2NzkwNjc3OTcsImV4cCI6MTY4MDI3NzM5N30.HQ9vpue9VU4ud1vSPFT_DHosZrEoluweb4XqHuugeck

// Featch w/ access token: fetch("https://striveschool-api.herokuapp.com/api/put-your-endpoint-here/", {
// headers: {
// "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MGNkYWY4MWI0MjAwMTM5YjI3YjgiLCJpYXQiOjE2NzkwNjc3OTcsImV4cCI6MTY4MDI3NzM5N30.HQ9vpue9VU4ud1vSPFT_DHosZrEoluweb4XqHuugeck"
// }
// })

//FORM per creazione/modifica prodotti

function preview() {
	let inputPic = document.getElementById('inputPic');
	let frame = document.getElementById('frame');
	frame.src = inputPic.value;
}
function clearImage() {
	let inputPic = document.getElementById('inputPic');
	let frame = document.getElementById('frame');
	inputPic.value = null;
	frame.src = '';
}

const handleValidate = () => {
	const form = document.querySelector('form');
	form.classList.add('validated');
};

const URLParams = new URLSearchParams(window.location.search);
const selectedId = URLParams.get('id');

const endpoint = selectedId
	? 'https://striveschool-api.herokuapp.com/api/product/' + selectedId
	: 'https://striveschool-api.herokuapp.com/api/product/';
const method = selectedId ? 'PUT' : 'POST';

const handleSubmit = async (event) => {
	event.preventDefault();
	let productId = Math.floor(Math.random() * 100);

	let productName = document.getElementById('productName');
	let productDescription = document.getElementById('productDescription');
	let productPrice = document.getElementById('productPrice');
	let productImage = document.getElementById('frame');
	let productBrand = document.getElementById('productBrand');

	let newProduct = {
		userId: productId,
		name: productName.value,
		description: productDescription.value,
		price: productPrice.value,
		brand: productBrand.value,
		imageUrl: productImage.src,
	};

	try {
		const resp = await fetch(endpoint, {
			method: 'POST',
			body: JSON.stringify(newProduct),
			headers: {
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MGNkYWY4MWI0MjAwMTM5YjI3YjgiLCJpYXQiOjE2NzkwNjc3OTcsImV4cCI6MTY4MDI3NzM5N30.HQ9vpue9VU4ud1vSPFT_DHosZrEoluweb4XqHuugeck',
				'Content-Type': 'application/json',
			},
		});

		if (resp.ok) {
			const newProductObj = await resp.json();
			if (selectedId) {
				alert("Risorsa con l'id " + newProductObj._id + ', modificata con successo');
			} else {
				alert("Risorsa con l'id " + newProductObj._id + ', creata con successo');
			}
		} else {
			throw new Error('La richiesta non è andata a buon fine');
		}
	} catch (error) {
		alert(error);
	}
	console.log('HERE ON SUBMIT', newProduct);
};

const handleDelete = async () => {
	const hasAccepted = confirm('Sei sicuro di voler eliminare il prodotto?');

	// se accetta procediamo all'effettiva rimozione
	if (hasAccepted) {
		try {
			const resp = await fetch(endpoint, { method: 'DELETE' });
			const deletedProduct = await resp.json();

			alert('Hai eliminato il prodotto ' + deletedProduct.name);
			window.location.assign('./backoffice.html');
		} catch (error) {
			console.log(error);
		}
	}
};

let loadProducts = async () => {
	try {
		let loadProducts = await fetch('https://striveschool-api.herokuapp.com/api/product/', {
			headers: {
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MGNkYWY4MWI0MjAwMTM5YjI3YjgiLCJpYXQiOjE2NzkwNjc3OTcsImV4cCI6MTY4MDI3NzM5N30.HQ9vpue9VU4ud1vSPFT_DHosZrEoluweb4XqHuugeck',
			},
		});
		let products = await loadProducts.json();

		let cards = document.querySelectorAll('.card');
		cards.forEach((card, index) => {
			card.innerHTML = `
            <img src="${products[index].imageUrl}" class="card-img-top" alt="none">
            <div class="card-body">
              <h5 class="card-title">${products[index].name}</h5>
              <p class="card-text">${products[index].description}</p>
              <p class="card-text">€${products[index].price}</p>
              <a href="#" class="btn btn-primary">View</a>
            </div>
          </div>`;
		});
	} catch (error) {
		console.log(error);
	}
};
loadProducts();

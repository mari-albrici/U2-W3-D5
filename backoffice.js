const link = 'https://striveschool-api.herokuapp.com/api/product/';
const authorization =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MGNkYWY4MWI0MjAwMTM5YjI3YjgiLCJpYXQiOjE2NzkwNjk1NjYsImV4cCI6MTY4MDI3OTE2Nn0.OiZwgoxQCb_nUuFOYysBNTAyuwEXU2YbDGt4vkzxECE';

const URLParams = new URLSearchParams(window.location.search);
const selectedId = URLParams.get('id');

const endpoint = selectedId ? link + selectedId : link;
const method = selectedId ? 'PUT' : 'POST';

window.onload = () => {
	if (selectedId) {
		document.getElementById('editTitle').innerText = 'Modifica';
		document.getElementById('submit').classList.add('d-none');
		document.getElementById('editItem').classList.remove('d-none');
		document.getElementById('deleteItem').classList.remove('d-none');

		fetch(endpoint, {
			headers: {
				Authorization: `Bearer ${authorization}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				const { name, description, brand, imageUrl, price } = data;
				document.getElementById('name').value = name;
				document.getElementById('description').value = description;
				document.getElementById('brand').value = brand;
				document.getElementById('imageUrl').value = imageUrl;
				document.getElementById('price').value = price;
			})
			.catch((err) => {
				console.log(err);
			});
	}
};

const getProducts = (event) => {
	event.preventDefault();

	const article = {
		name: document.getElementById('name').value,
		description: document.getElementById('description').value,
		brand: document.getElementById('brand').value,
		imageUrl: document.getElementById('imageUrl').value,
		price: document.getElementById('price').value,
	};

	fetch(endpoint, {
		method: method,
		headers: {
			Authorization: `Bearer ${authorization}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(article),
	})
		.then(() => {
			document.getElementById('name').value = '';
			document.getElementById('description').value = '';
			document.getElementById('brand').value = '';
			document.getElementById('imageUrl').value = '';
			document.getElementById('price').value = '';
		})
		.catch((err) => {
			console.log(err);
		});
};

const deleteProduct = () => {
	const hasAccepted = confirm("Are you sure you want to delete the product? This action isn't undoable.");
	if (hasAccepted) {
		fetch(endpoint, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${authorization}`,
			},
		})
			.then((res) => {
				if (res.ok) {
					alert('Product successfully deleted');
					window.location.href = 'index.html';
				} else {
					throw new Error("Error: something went wrong with the deletion of the product.");
				}
			})
			.catch((err) => {
				console.log(err);
				alert("Error: something went wrong with the deletion of the product.");
			});
	}
};

function preview() {
	let inputPic = document.getElementById('imageUrl');
	let frame = document.getElementById('frame');
	frame.src = inputPic.value;
}
function clearImage() {
	let inputPic = document.getElementById('imageUrl');
	let frame = document.getElementById('frame');
	inputPic.value = null;
	frame.src = '';
}
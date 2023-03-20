const link = 'https://striveschool-api.herokuapp.com/api/product/';
const authorization =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MGNkYWY4MWI0MjAwMTM5YjI3YjgiLCJpYXQiOjE2NzkwNjk1NjYsImV4cCI6MTY4MDI3OTE2Nn0.OiZwgoxQCb_nUuFOYysBNTAyuwEXU2YbDGt4vkzxECE';

window.onload = () => {
	fetch(link, {
		headers: {
			Authorization: `Bearer ${authorization}`,
		},
	})
		.then((responseObj) => responseObj.json())
		.then((products) => {
			let row = document.getElementById('row');
			products.forEach((product) => {
				const card = document.createElement('div');
				card.classList.add('col');
				card.innerHTML = `
                                <div class="card shadow-sm bg-light mt-4">
                                <img src="${product.imageUrl}" alt="article image" class="img-fluid">
                                <div class="card-body">
                                    <h5 class="card-title">${product.name}</h5>
                                    <p class="card-text">${product.brand}</p>
                                    <p class="card-text">€${product.price}</p>
                                    <div class="d-flex justify-content-between">
                                    <a href="details.html?id=${product._id}" class="btn btn-primary">View</a>
                                    <a href="backoffice.html?id=${product._id}" class="btn btn-outline-secondary">Modify</a>
                                    </div>
                                </div>
                                </div>
      `;
				row.appendChild(card);
			});
		})
		.catch((error) => console.error(error));
};
const link = 'https://striveschool-api.herokuapp.com/api/product/';
const authorization =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MGNkYWY4MWI0MjAwMTM5YjI3YjgiLCJpYXQiOjE2NzkwNjk1NjYsImV4cCI6MTY4MDI3OTE2Nn0.OiZwgoxQCb_nUuFOYysBNTAyuwEXU2YbDGt4vkzxECE';

const URLParams = new URLSearchParams(window.location.search);
const selectedId = URLParams.get('id');

const endpoint = selectedId ? link + selectedId : link;
const method = selectedId ? 'PUT' : 'POST';

window.onload = () => {
	fetch(endpoint, {
		headers: {
			Authorization: `Bearer ${authorization}`,
		},
	})
		.then((resp) => resp.json())
		.then((data) => {
			const product = data;

			const container = document.getElementById('productContainer');
			container.innerHTML = `
								<h2> ${product.name} </h2>
								<hr class="border border-2 border-primary"
								<div class="container container-fluid my-2">
									<div class="row"> 
										<div class="col-5"> 
										<img src="${product.imageUrl}" class="img-fluid border border-2 border-secondary">
										</div>
										<div class="col-7"> 
										<h4> ${product.name} </h4>
										<p class="container container-fluid"> ${product.description} </p>
										<p class="fs-3"> €${product.price} </p>
                                        <button class="btn btn-outline-primary">Add to cart <i class="bi bi-bag-plus"></i></button>
										</div>
										<div class="d-flex justify-content-end">
										<a href="backoffice.html?id=${product._id}" class="btn btn-secondary">Edit</a>
									  </div>
									</div>
								</div>
      `;
		})
		.catch((err) => {
			console.log(err);
		});
};
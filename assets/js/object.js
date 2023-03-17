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
		.then((res) => res.json())
		.then((data) => {
			const prodotto = data;

			const container = document.getElementById('productContainer');
			container.innerHTML = `
								<h3> ${prodotto.name} </h3>
								<hr class="border border-2 border-primary"
								<div class="container container-fluid my-2">
									<div class="row"> 
										<div class="col-5"> 
										<img src="${prodotto.imageUrl}" class="img-fluid border border-2 border-secondary">
										</div>
										<div class="col-7"> 
										<h5> ${prodotto.name} </h5>
										<p> ${prodotto.description} </p>
										<p> €${prodotto.price} - IVA inclusa</p>
										</div>
										<div class="d-flex justify-content-end">
										<a href="backoffice.html?id=${prodotto._id}" class="btn btn-secondary">Edit</a>
									  </div>
									</div>
								</div>
      `;
			rowDiv.appendChild(cardDiv);
		})
		.catch((err) => {
			console.log(err);
		});
};

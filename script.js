// ACCESS TOKEN: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MGNkYWY4MWI0MjAwMTM5YjI3YjgiLCJpYXQiOjE2NzkwMzU2MTAsImV4cCI6MTY4MDI0NTIxMH0.8xfKaqz9fVZRG9kGb-jEnd3VRMa0XZB1q9e_wwtpgCI

// Featch w/ access token: fetch("https://striveschool-api.herokuapp.com/api/put-your-endpoint-here/", {
// headers: {
// "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MGNkYWY4MWI0MjAwMTM5YjI3YjgiLCJpYXQiOjE2NzkwMzU2MTAsImV4cCI6MTY4MDI0NTIxMH0.8xfKaqz9fVZRG9kGb-jEnd3VRMa0XZB1q9e_wwtpgCI"
// }
// })

const handleSubmit = async (event) => {
	event.preventDefault();

	// creazione dell'oggetto che invieremo come payload
	// N.B. la creazione di newAppointment viene fatta ad ogni submit del form
	const newProduct = {
		name: document.getElementById('name').value,
		description: document.getElementById('description').value,
		price: document.getElementById('price').value,
		time: document.getElementById('time').value,
	};

	console.log('HERE ON SUBMIT', newAppointment);

	try {
		// attivo lo stato di caricamento
		isLoading(true);

		// qui l'endpoint dipende da come siamo arrivati su questa pagina, se per creazione sarà solo l'url normale, se per modifica avrà anche l'id
		// questo è deciso dal ternary operator alla creazione della variabile "endpoint" in alto
		const resp = await fetch(endpoint, {
			method, // uguale a scrivere method: method,
			body: JSON.stringify(newAppointment), // è fondamentale fare la stringhifizzazione dell'oggetto nativo o invieremo "[object Object]"
			// un header in particolare è importantissimo, il Content-Type, per specificare il formato di invio, altrimenti non verrà riconosciuto dal server
			// l'Authorization header serve in caso di API che richiedono autenticazione tramite una API Key
			headers: {
				// "Authorization" : "Bearer [YOUR API KEY]", // metodo di autenticazione con API Key standard
				'Content-Type': 'application/json',
			},
		});

		if (resp.ok) {
			const newAppObj = await resp.json();
			// Aspettiamo il valore di newAppObj per estrarre un'informazione nuova generata dal server ossia l'_id

			// in base a se siamo qui per creazione o modifica creeremo il messaggio più appropriato alla fine della richiesta
			if (selectedId) {
				alert("Risorsa con l'id " + newAppObj._id + ', modificata con successo');
			} else {
				alert("Risorsa con l'id " + newAppObj._id + ', creata con successo');
			}
		} else {
			throw new Error('La richiesta non è andata a buon fine');
		}
	} catch (error) {
		alert(error);
	} finally {
		// spengo il loader di caricamento sia quando la richiesta va a buon fine, sia quando abbiamo un errore e si attiva il catch
		// poco prima di uscire dall'esecuzione del contesto, il metodo finally si attiva a sua volta
		isLoading(false);
	}
};

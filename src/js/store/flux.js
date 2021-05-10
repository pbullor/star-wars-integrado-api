const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			personajes: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: async () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
                */

				//Traigo los personajes
				const resPersonajes = await (await fetch("https://www.swapi.tech/api/people")).json();
				const dataPersonajes = await resPersonajes.results;
				let personajesFull = [];
				await dataPersonajes.map(async item => {
					let url = "https://www.swapi.tech/api/people/" + item.uid;
					const resDetalle = await (await fetch(url)).json();
					const dataDetalle = await resDetalle.result;
					console.log(dataDetalle);
					let objPersonaje = {
						id: item.uid,
						name: item.name,
						description: dataDetalle.description,
						detalle: dataDetalle.properties
					};
					personajesFull.push(objPersonaje);
					return objPersonaje;
				});

				setStore({ personajes: personajesFull });
				console.log("Objeto Personaje", personajesFull);

				//console.log(data);
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;

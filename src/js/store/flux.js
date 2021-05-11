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
				const resPersonajes = await (await fetch("https://www.swapi.tech/api/people")).json();
				const dataPersonajes = await resPersonajes.results;
				const store = getStore();
				console.log("data personajes", dataPersonajes);

				for (let i = 0; i < dataPersonajes.length; i++) {
					let url = dataPersonajes[i].url;
					const resDetalle = await (await fetch(url)).json();
					const dataDetalle = await resDetalle.result;
					console.log(dataDetalle);
					let objPersonaje = {
						id: dataPersonajes[i].uid,
						name: dataPersonajes[i].name,
						description: dataDetalle.description,
						detalle: dataDetalle.properties
					};
					setStore({ personajes: [...store.personajes, objPersonaje] });
				}
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

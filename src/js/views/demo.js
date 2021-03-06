import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.scss";
import Card from "../component/card";

export const Demo = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<h1 className="text-danger m-2">Character</h1>
			<div className="row d-flex-row flex-nowrap overflow-auto mt-3">
				{store.personajes.map((item, index) => {
					return (
						<div className="col-lg-4 mb-5" key={index}>
							<Card
								id={index}
								name={item.name}
								gender={item.detalle.gender}
								eyecolor={item.detalle.eye_color}
								haircolor={item.detalle.hair_color}
							/>
						</div>
					);
				})}
			</div>
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
};

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.scss";
import Card from "../component/card";

export const Demo = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<div className="row d-flex-row flex-nowrap overflow-auto mt-3">
				{store.personajes.map((item, index) => {
					return (
						<div className="col-lg-4 mb-5" key={index}>
							<Card />
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

/** @format */

import React, { useState } from "react";
import { useGlobalContext } from "../context";
import Todoitems from "./TodoItems";

const Home = () => {
	const { todo, setTodo, handleSubmit, user } = useGlobalContext();

	return (
		<div>
			<h1 className="text-white text-3xl text-center mt-4">
				Welcome {user}, create a todo
			</h1>
			<form
				onSubmit={handleSubmit}
				className="mx-auto mt-10 max-w-xl rounded-lg bg-white p-6"
			>
				<fieldset>
					<div className="flex gap-3">
						<input
							type="text"
							placeholder="Enter todo"
							className="p-2 flex-1 border border-solid"
							onChange={(e) => setTodo(e.target.value)}
							value={todo}
						/>
						<button className="uppercase tracking-wide bg-primary p-2 text-white rounded-lg">
							save
						</button>
					</div>
					<Todoitems />
				</fieldset>
			</form>
		</div>
	);
};

export default Home;

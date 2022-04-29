/** @format */

import axios from "axios";
import React, { useState } from "react";
import { useGlobalContext } from "../context";
import Todoitems from "./TodoItems";

const Home = () => {
	const [todo, setTodo] = useState("");
	const [completed, setCompleted] = useState(false);
	const { baseURL, fetchTodo } = useGlobalContext();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!todo) return;
		const data = {
			name: todo,
			completed: completed,
		};

		try {
			const res = await axios.post(`${baseURL}/todos`, {
				data: data,
			});

			console.log(res);
			fetchTodo();
			setTodo("");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h1 className="text-white text-3xl text-center mt-4">
				Welcome to my todo app
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

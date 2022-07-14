import React, { useState } from "react";
import { ImBin, FiEdit } from "react-icons/all";
import { useGlobalContext } from "../context";
import axios from "axios";

const Todoitems = () => {
	const { todos, baseURL, fetchTodo, handleDelete, handleEdit, setTodos } =
		useGlobalContext();

	const handleCheckbox = async (e, id) => {
		const token = localStorage.getItem("token");
		try {
			await axios.put(
				`${baseURL}/todos/${id}`,
				{
					data: { completed: e.target.checked },
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			fetchTodo(setTodos);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<ul className="mt-12">
				{todos &&
					todos.map((todo) => {
						const { id, attributes } = todo;

						return (
							<li
								key={id}
								className={`flex cursor-pointer border border-solid p-4 rounded hover:shadow-xl ${
									attributes.completed && "bg-blue-100"
								}`}
							>
								<div className="flex flex-1 gap-4">
									<input
										type="checkbox"
										className="w-6 h-6"
										checked={attributes.completed}
										onChange={(e) => handleCheckbox(e, id)}
									/>
									<p
										className={`text-xl font-semibold ${
											attributes.completed && `line-through text-lg`
										}`}
									>
										{attributes.name}
									</p>
								</div>
								<div className="flex gap-2">
									<FiEdit
										className="cursor-pointer w-6 h-6 hover:scale-110 transition-transform delay-200 ease-linear"
										onClick={(e) => handleEdit(id)}
									/>
									<ImBin
										className="cursor-pointer w-6 h-6 hover:scale-110 transition-transform delay-200 ease-linear"
										onClick={() => handleDelete(id, setTodos)}
									/>
								</div>
							</li>
						);
					})}
			</ul>
		</>
	);
};

export default Todoitems;

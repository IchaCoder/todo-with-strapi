import React, { useState } from "react";
import axios from "axios";

const baseURL = "http://localhost:1337/api";

export const fetchTodo = async (setTodos) => {
	const token = localStorage.getItem("token");
	try {
		const res = await axios.get(`${baseURL}/todos`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const { data } = res.data;
		console.log(data);
		setTodos(data);
	} catch (error) {
		console.log(error);
	}
};

export const handleDelete = async (id, setTodos) => {
	const token = localStorage.getItem("token");
	try {
		await axios.delete(`${baseURL}/todos/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		fetchTodo(setTodos);
	} catch (error) {
		console.log(error);
	}
};

const handleSubmit = async (e) => {
	e.preventDefault();
	if (!todo) return;
	const data = {
		name: todo,
		completed: completed,
	};

	const token = localStorage.getItem("token");

	if (!isEditing) {
		try {
			await axios.post(
				`${baseURL}/todos`,
				{
					data: data,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			fetchTodo(setTodos);
			setTodo("");
		} catch (error) {
			console.log(error);
		}
	} else {
		try {
			await axios.put(
				`${baseURL}/todos/${editingID}`,
				{
					data: { name: todo },
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			fetchTodo(setTodos);

			setEditingID("");
			setIsEditing(false);
			setTodo("");
		} catch (error) {
			console.log(error);
		}
	}
};

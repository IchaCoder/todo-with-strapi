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

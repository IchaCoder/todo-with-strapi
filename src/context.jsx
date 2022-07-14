import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Loading from "./component/Loading";
import { fetchTodo, handleDelete } from "./Functions";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const baseURL = "http://localhost:1337/api";
	const [todos, setTodos] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [editingID, setEditingID] = useState(false);
	const [todo, setTodo] = useState("");
	const [completed] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState("");

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

	const handleEdit = (id) => {
		const { attributes } = todos.find((item) => item.id == id);
		setTodo(attributes.name);
		setIsEditing(true);
		setEditingID(id);
	};

	useEffect(() => {
		fetchTodo(setTodos);
	}, []);

	if (loading) {
		return <Loading />;
	}

	return (
		<AppContext.Provider
			value={{
				todos,
				baseURL,
				fetchTodo,
				isEditing,
				setIsEditing,
				editingID,
				setEditingID,
				handleSubmit,
				todo,
				setTodo,
				handleDelete,
				handleEdit,
				email,
				setEmail,
				password,
				setPassword,
				setLoading,
				setUser,
				user,
				setTodos,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppProvider, AppContext };

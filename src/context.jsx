import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Loading from "./component/Loading";

const AppContext = React.createContext();

const getLocalStorage = () => {
	let token = localStorage.getItem("token");
	if (token) {
		return (token = JSON.parse(localStorage.getItem("token")));
	} else {
		return "";
	}
};

const AppProvider = ({ children }) => {
	const baseURL = "http://localhost:1337/api";
	const [todos, setTodos] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [editingID, setEditingID] = useState(false);
	const [todo, setTodo] = useState("");
	const [completed, setCompleted] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState("");
	const [token, setToken] = useState(getLocalStorage());
	console.log(token);

	const fetchTodo = async () => {
		try {
			const res = await axios.get(`${baseURL}/todos`);
			const { data } = res.data;
			setTodos(data);
			console.log(data);
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

		if (!isEditing) {
			try {
				const res = await axios.post(`${baseURL}/todos`, {
					data: data,
				});
				fetchTodo();
				setTodo("");
			} catch (error) {
				console.log(error);
			}
		} else {
			try {
				const res = await axios.put(`${baseURL}/todos/${editingID}`, {
					data: { name: todo },
				});
				fetchTodo();
				setEditingID("");
				setIsEditing(false);
				setTodo("");
			} catch (error) {
				console.log(error);
			}
		}
	};

	const handleDelete = async (id) => {
		try {
			const res = await axios.delete(`${baseURL}/todos/${id}`);
			fetchTodo();
		} catch (error) {
			console.log(error);
		}
	};

	const handleEdit = (id) => {
		const { attributes } = todos.find((item) => item.id == id);
		setTodo(attributes.name);
		setIsEditing(true);
		setEditingID(id);
	};

	useEffect(() => {
		fetchTodo();
	}, []);

	useEffect(() => {
		localStorage.setItem("token", JSON.stringify(token));
	}, [token]);

	useEffect(() => {
		if (token) {
			setLoading(false);
		}
	});

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
				setToken,
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

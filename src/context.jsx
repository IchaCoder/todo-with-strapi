import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const baseURL = "http://localhost:1337/api";
	const [todos, setTodos] = useState([]);

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
	const a = "hello wold";

	useEffect(() => {
		fetchTodo();
	}, []);

	return (
		<AppContext.Provider value={{ todos, baseURL, fetchTodo }}>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppProvider, AppContext };

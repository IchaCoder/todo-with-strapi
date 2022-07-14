import React from "react";
import { useGlobalContext } from "./context";
import { Navigate } from "react-router-dom";

const Protectedroute = ({ children }) => {
	// const { token, setLoading } = useGlobalContext();
	const token = localStorage.getItem("token");

	if (!token) {
		return <Navigate to="/" />;
	}
	return children;
};

export default Protectedroute;

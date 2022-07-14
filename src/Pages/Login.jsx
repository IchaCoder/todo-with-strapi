import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";

const Login = () => {
	const {
		email,
		setPassword,
		setEmail,
		password,
		setLoading,
		setUser,
		fetchTodo,
	} = useGlobalContext();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const { data } = await axios.post(
				"http://localhost:1337/api/auth/local",
				{
					identifier: email,
					password,
				}
			);
			console.log(data);
			localStorage.setItem("token", data.jwt);
			setUser(data.user.username);
			setPassword("");
			setEmail("");
			navigate("/home");
			fetchTodo();
			setLoading(false);
		} catch (error) {
			console.log(error);
			localStorage.removeItem("token");
			setLoading(false);
		}
	};

	return (
		<div className="">
			<form
				className="mx-auto mt-10 max-w-xl rounded-lg bg-white p-6"
				onSubmit={handleSubmit}
			>
				<h2 className="text-3xl text-center my-6 text-primary font-bold">
					Login
				</h2>
				<fieldset className="flex flex-col">
					<input
						type="email"
						name=""
						autoComplete="false"
						placeholder="Enter Email"
						className="p-2 border-4 border-solid border-primary"
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<input
						type="password"
						name=""
						className="p-2 border-4 border-solid my-4 border-primary"
						placeholder="Enter Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button className="border-4 border-solid my-4 p-2 text-white bg-primary hover:bg-blue-100 border-primary transition-all delay-300 ease-linear uppercase hover:text-black">
						Submit
					</button>
				</fieldset>
				<div>
					Don't have an accout yet?{" "}
					<Link to="/signup" className="text-blue-500">
						Signup{" "}
					</Link>{" "}
				</div>
			</form>
		</div>
	);
};

export default Login;

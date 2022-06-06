/** @format */

import { useState } from "react";
import Home from "./component/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Protectedroute from "./ProtectedRoute";

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<Protectedroute>
							<Home />
						</Protectedroute>
					}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>
		</Router>
	);
}

export default App;

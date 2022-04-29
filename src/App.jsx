/** @format */

import { useState } from "react";
import Home from "./component/Home";
import Todoitems from "./component/TodoItems";
import { useGlobalContext } from "./context";

function App() {
	return (
		<div className="">
			<Home />
		</div>
	);
}

export default App;

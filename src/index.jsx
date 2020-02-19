import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import InputNumber from "./InputNumber/InputNumber";

ReactDOM.render(
	(
		<div>
			<App />
			<InputNumber min={3} max={10.5} onChange={( val ) => { console.warn( '[я креветко!]', val ); }}/>
			<InputNumber value={8} min={0} max={300} onChange={( val ) => { console.warn( '[а я нет....]', val ); }}/>
		</div>
	),
	document.getElementById('root')
);

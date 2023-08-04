// Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css'
import './index.css';
import App from './App';

// Redux
import { Provider } from "react-redux";
import store from "./store/store";

// ReactDOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={ store }>
		<App />
	</Provider>
);
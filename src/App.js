import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Checkout from './Checkout';
import { set_user_action } from './Constants';
import { auth } from './Firebase';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import { useStateValue } from './StateProvider';

function App() {
	const [, dispatch] = useStateValue();

	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				dispatch({
					type: set_user_action,
					user: authUser,
				});
			} else {
				dispatch({
					type: set_user_action,
					user: null,
				});
			}
		});
	}, [dispatch]);

	return (
		<div className='app'>
			<Router>
				<Switch>
					<Route path='/login'>
						<Login />
					</Route>
					<Route path='/checkout'>
						<Header />
						<Checkout />
					</Route>
					<Route path='/orders'>
						<Header />
						<h1>This is order page</h1>
					</Route>
					<Route path='/'>
						<Header />
						<Home />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Checkout from './Checkout';
import Payment from './Payment';
import {
	add_add_to_basket_listener,
	remove_add_to_basket_listener,
	checkout_page,
	login_page,
	orders_page,
	payment_page,
	set_user_action,
} from './Constants';
import { auth } from './Firebase';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import { useStateValue } from './StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Orders';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useTransition, animated } from 'react-spring';
import Footer from './Footer';

const promise = loadStripe(
	'pk_test_51HzzQUA8EM7qL2sb0lGbikwZMbBrbepoLelCapPJowzUTvNZEfUEXsgoQFUZ2KRHHqcDpMPoRMKjhyzU8GK1otgP00wY1FZ4dm'
);

function App() {
	const [, dispatch] = useStateValue();

	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);
	const [carts, setCarts] = useState([]);

	const transitions = useTransition(carts, (item, i) => i, {
		from: {
			transform: `translate(${width / 2 - 100}px, ${
				height / 2 - 100
			}px) scale(0)`,
		},
		enter: {
			transform: `translate(${width / 2 - 100}px, ${
				height / 2 - 100
			}px) scale(1)`,
		},
		leave: {
			transform: `translate(${width}px, ${-100}px) scale(0.3)`,
		},
		config: { duration: 500 },
	});

	useEffect(() => {
		const handleWindowResize = (ev) => {
			setWidth(window.innerWidth);
			setHeight(window.innerHeight);
		};

		const handleDispatch = () => {
			setCarts([...carts, 'tests1']);
			setTimeout(() => {
				setCarts([...carts.splice(carts.length - 1, 1)]);
			}, 500);
		};

		window.addEventListener('resize', handleWindowResize);
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

		dispatch({
			type: add_add_to_basket_listener,
			payload: handleDispatch,
		});
		return () => {
			window.removeEventListener('resize', handleWindowResize);
			dispatch({
				type: remove_add_to_basket_listener,
				payload: handleDispatch,
			});
		};
	}, [carts, dispatch]);

	return (
		<div className='app'>
			{transitions.map(({ item, props, key }) => (
				<animated.div
					className='cart-container'
					style={{ position: 'fixed', ...props }}
					key={key}
				>
					<ShoppingCartIcon className='cart-logo' />
				</animated.div>
			))}
			<Router>
				<Switch>
					<Route path={login_page}>
						<Login />
					</Route>
					<Route path={checkout_page}>
						<Header />
						<Checkout />
					</Route>
					<Route path={orders_page}>
						<Header />
						<Orders />
					</Route>
					<Route path={payment_page}>
						<Header />
						<Elements stripe={promise}>
							<Payment />
						</Elements>
					</Route>
					<Route path='/'>
						<Header />
						<Home />
					</Route>
				</Switch>
			</Router>

			<Footer />
		</div>
	);
}

export default App;

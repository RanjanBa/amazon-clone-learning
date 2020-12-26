import React, { useEffect, useState } from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useStateValue } from './StateProvider';
import { auth } from './Firebase';
import { Link } from 'react-router-dom';
import {
	checkout_page,
	login_page,
	orders_page,
	add_add_to_basket_listener,
	remove_add_to_basket_listener,
	add_remove_from_basket_listener,
	remove_remove_from_basket_listener,
} from './Constants';
import { useSpring, animated } from 'react-spring';

function Header() {
	const [{ basket, user }, dispatch] = useStateValue();

	const [count, setCount] = useState(basket?.length);

	const handleAuthentication = () => {
		if (user) {
			auth.signOut();
		}
	};
	// const props = useSpring({opacity: 1, color: 'red'})
	const props = useSpring({
		to: {
			transform: 'scale(1) rotate(0)',
			opacity: 1,
		},
		from: {
			opacity: 0,
			transform: 'scale(0) rotate(360deg)',
		},

		config: {
			duration: 500,
		},
	});

	useEffect(() => {
		const handleDispatch = (data) => {
			setTimeout(() => {
				setCount(data?.length);
			}, 800);
		};

		dispatch({
			type: add_add_to_basket_listener,
			payload: handleDispatch,
		});
		dispatch({
			type: add_remove_from_basket_listener,
			payload: handleDispatch,
		});

		return () => {
			dispatch({
				type: remove_add_to_basket_listener,
				payload: handleDispatch,
			});
			dispatch({
				type: remove_remove_from_basket_listener,
				payload: handleDispatch,
			});
		};
	}, [basket, dispatch]);

	return (
		<div className='header'>
			<Link to='/'>
				<animated.img
					src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'
					alt=''
					className='header-logo'
					style={props}
				/>
			</Link>

			<div className='header-search'>
				<input type='text' className='header-search-input' />
				<SearchIcon className='header-search-icon'></SearchIcon>
			</div>

			<div className='header-nav'>
				<Link to={user ? '/' : login_page}>
					<div
						onClick={handleAuthentication}
						className='header-option'
					>
						<span className='header-option-one'>
							Hello {!user ? 'Guest' : user.email}
						</span>
						<span className='header-option-two'>
							{user ? 'Sign out' : 'Sign In'}
						</span>
					</div>
				</Link>

				<Link to={orders_page}>
					<div className='header-option'>
						<span className='header-option-one'>Returns</span>
						<span className='header-option-two'>& orders</span>
					</div>
				</Link>

				<div className='header-option'>
					<span className='header-option-one'>Your</span>
					<span className='header-option-two'>Prime</span>
				</div>

				<Link to={checkout_page}>
					<div className='header-option-basket'>
						<ShoppingBasketIcon />
						<span className='header-option-two header-basket-count'>
							{count}
						</span>
					</div>
				</Link>
			</div>
		</div>
	);
}

export default Header;

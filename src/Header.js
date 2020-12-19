import React from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useStateValue } from './StateProvider';
import { auth } from './Firebase';
import { Link } from 'react-router-dom';

function Header() {
	const [{ basket, user }] = useStateValue();

	const handleAuthentication = () => {
		if (user) {
			auth.signOut();
		}
	};

	return (
		<div className='header'>
			<Link to='/'>
				<img
					src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'
					alt=''
					className='header-logo'
				/>
			</Link>

			<div className='header-search'>
				<input type='text' className='header-search-input' />
				<SearchIcon className='header-search-icon'></SearchIcon>
			</div>

			<div className='header-nav'>
				<Link to={!user && '/login'}>
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

				<Link to='/orders'>
					<div className='header-option'>
						<span className='header-option-one'>Returns</span>
						<span className='header-option-two'>& orders</span>
					</div>
				</Link>

				<div className='header-option'>
					<span className='header-option-one'>Your</span>
					<span className='header-option-two'>Prime</span>
				</div>

				<Link to='/checkout'>
					<div className='header-option-basket'>
						<ShoppingBasketIcon />
						<span className='header-option-two header-basket-count'>
							{basket?.length}
						</span>
					</div>
				</Link>
			</div>
		</div>
	);
}

export default Header;

import React from 'react';
import './CheckoutProduct.css';
import { remove_from_basket_action } from './Constants';
import { useStateValue } from './StateProvider';
import StarIcon from '@material-ui/icons/Star';
import { useSpring, animated } from 'react-spring';
import Truncate from 'react-truncate';

function CheckoutProduct({ id, title, image, price, rating, hideBtn, index }) {
	const [, dispatch] = useStateValue();

	const [{ scale }, set] = useSpring(() => ({ scale: 1, color: '#fff' }));
	const removeItem = () => {
		dispatch({
			type: remove_from_basket_action,
			payload: { id: id, index: index },
		});
	};

	return (
		<div className='checkout-product'>
			<img src={image} alt='' className='checkout-product-img' />

			<div className='checkout-product-info'>
				<Truncate
					className='checkout-product-title'
					lines={2}
					ellipsis={<span>...</span>}
				>
					{title}
				</Truncate>
				<p className='checkout-product-price'>
					<small>$</small>
					<strong>{price}</strong>
				</p>

				<div className='checkout-product-rating'>
					{Array(rating)
						.fill()
						.map((_, i) => (
							<StarIcon key={i} className='rating-star-icon' />
						))}
				</div>

				{!hideBtn && (
					<animated.button
						onMouseEnter={() => set({ scale: 1.2 })}
						onMouseLeave={() => set({ scale: 1 })}
						onClick={removeItem}
						style={{
							transform: scale.interpolate((x) => `scale(${x})`),
						}}
					>
						Remove from Basket
					</animated.button>
				)}
			</div>
		</div>
	);
}

export default CheckoutProduct;

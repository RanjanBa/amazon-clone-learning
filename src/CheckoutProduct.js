import React from 'react';
import './CheckoutProduct.css';
import { remove_from_basket_action } from './Constants';
import { useStateValue } from './StateProvider';
import StarIcon from '@material-ui/icons/Star';

function CheckoutProduct({ id, title, image, price, rating, hideBtn }) {
	const [{ basket }, dispatch] = useStateValue();

	const removeItem = () => {
		dispatch({ type: remove_from_basket_action, id: id });
	};

	return (
		<div className='checkout-product'>
			<img src={image} alt='' className='checkout-product-img' />

			<div className='checkout-product-info'>
				<p className='checkout-product-title'>{title}</p>
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
					<button onClick={removeItem}>Remove from Basket</button>
				)}
			</div>
		</div>
	);
}

export default CheckoutProduct;

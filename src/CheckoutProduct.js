import React from 'react';
import './CheckoutProduct.css';
import StarIcon from '@material-ui/icons/Star';
import { useStateValue } from './StateProvider';
import { remove_from_basket_action } from './Constants';

function CheckoutProduct({ id, image, title, price, rating }) {
	const [{}, dispatch] = useStateValue();

	const removeItem = () => {
		console.log(`remove item ${id}`);
		dispatch({
			type: remove_from_basket_action,
			id: id,
		});
	};

	return (
		<div className='checkout-product'>
			<img className='checkout-product-img' src={image} alt='' />

			<div className='checkout-product-info'>
				<p className='checkout-product-title'>{title}</p>
				<p className='checkout-product-price'>
					<small>$</small>
					<strong>{price}</strong>
				</p>
				<div className='checkout-product-rating'>
					{
						// console.log(rating),
						Array(rating)
							.fill()
							.map((_, i) => (
								<StarIcon key={i}></StarIcon>
							))
					}
					;
				</div>
				<button onClick={removeItem}>Remove from Basket</button>
			</div>
		</div>
	);
}

export default CheckoutProduct;

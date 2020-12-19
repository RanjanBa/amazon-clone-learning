import React from 'react';
import './Product.css';
import StarIcon from '@material-ui/icons/Star';
import { useStateValue } from './StateProvider';
import { add_to_basket_action } from './Constants';

function Product({ id, title, image, price, rating }) {
	const [, dispatch] = useStateValue();

	const addToBasket = () => {
		dispatch({
			type: add_to_basket_action,
			item: {
				id: id,
				title: title,
				image: image,
				price: price,
				rating: rating,
			},
		});
	};

	return (
		<div className='product'>
			<div className='product-info'>
				<p>{title}</p>
				<p className='product-price'>
					<small>$</small>
					<strong>{price}</strong>
				</p>

				<div className='product-rating'>
					{Array(rating)
						.fill()
						.map((_, i) => (
							<StarIcon key={i} className='rating-star-icon' />
						))}
				</div>
			</div>

			<img src={image} alt='' />

			<button onClick={addToBasket}>Add to Basket</button>
		</div>
	);
}

export default Product;

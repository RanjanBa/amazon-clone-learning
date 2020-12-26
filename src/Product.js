import React from 'react';
import './Product.css';
import StarIcon from '@material-ui/icons/Star';
import { useStateValue } from './StateProvider';
import { add_to_basket_action } from './Constants';
import { useSpring, animated } from 'react-spring';

function Product({ id, title, image, price, rating, handleAddBasket }) {
	const [, dispatch] = useStateValue();

	const [{ scale }, set] = useSpring(() => ({ scale: 1, color: '#fff' }));

	const addToBasket = () => {
		if (handleAddBasket) {
			handleAddBasket();
		}
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

			<animated.button
				onMouseEnter={() => set({ scale: 1.2 })}
				onMouseLeave={() => set({ scale: 1 })}
				onClick={addToBasket}
				style={{ transform: scale.interpolate((x) => `scale(${x})`) }}
			>
				Add to Basket
			</animated.button>
		</div>
	);
}

export default Product;

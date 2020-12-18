import React from 'react';
import './Checkout.css';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal';

function Checkout() {
	const [{ basket, user }] = useStateValue();
	return (
		<div className='checkout'>
			<div className='checkout-left'>
				<img
					className='checkout-ad'
					src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'
					alt=''
				></img>
				<div>
					<h3>{user?.email}</h3>
					<h2 className='checkout-title'>Your shopping Basket</h2>

					{basket.map((item, i) => (
						<CheckoutProduct
							key={i}
							id={item.id}
							image={item.image}
							title={item.title}
							price={item.price}
							rating={item.rating}
						/>
					))}
				</div>
			</div>

			<div className='checkout-right'>
				<Subtotal />
			</div>
		</div>
	);
}

export default Checkout;

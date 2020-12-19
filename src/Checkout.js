import React from 'react';
import './Checkout.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import Subtotal from './Subtotal';

function Checkout() {
	const [{ basket, user }] = useStateValue();
	return (
		<div className='checkout'>
			<div className='checkout-left'>
				<img
					src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'
					alt=''
					className='checkout-ad'
				/>
				<div>
					<h3>Hello, {user?.email}</h3>
					<h2 className='checkout-title'>Your shopping Basket</h2>
					{basket?.length === 0 ? (
						<h3>Shopping basket is empty</h3>
					) : (
						basket?.map((item) => (
							<CheckoutProduct
								id={item.id}
								title={item.title}
								image={item.image}
								price={item.price}
								rating={item.rating}
							/>
						))
					)}
				</div>
			</div>

			<div className='checkout-right'>
				<Subtotal />
			</div>
		</div>
	);
}

export default Checkout;

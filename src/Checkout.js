import React, { useEffect, useState } from 'react';
import './Checkout.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import Subtotal from './Subtotal';
import { useTransition, animated } from 'react-spring';

function Checkout() {
	const [{ basket, user }] = useStateValue();

	const [items, setItems] = useState([...basket]);

	useEffect(() => {
		let index = -1;
		if (basket.length > 0) {
			for (let i = 0; i < items.length; i++) {
				const element = items[i];
				let found = false;
				for (let j = 0; j < basket.length; j++) {
					if (element.key === basket[j].key) {
						found = true;
						break;
					}
				}

				if (!found) {
					index = i;
					break;
				}
			}
		} else {
			index = 0;
		}
		if (index >= 0 && index < items.length) {
			items.splice(index, 1);
			setItems(items);
		}
	}, [items, basket]);

	const transitions = useTransition(
		items.map((item, i) => ({ ...item, y: i * 200, height: 200 })),
		(item) => {
			return item.key;
		},
		{
			from: {
				height: 0,
				opacity: 0,
				transform: 'translateX(-100%) scale(0.5)',
			},
			leave: {
				opacity: 0,
				transform: 'translateX(-100%) scale(0.0)',
				height: 0,
			},
			enter: ({ y, height }) => ({
				y,
				height,
				opacity: 1,
				transform: 'translateX(0) scale(1)',
			}),
			update: ({ y, height }) => ({
				y,
				height,
			}),
			trail: 100,
			config: { duration: 500 },
		}
	);

	return (
		<div className='checkout'>
			<div className='checkout-left'>
				<img
					src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'
					alt=''
					className='checkout-ad'
				/>
				<div style={{ minHeight: '300px' }}>
					<h3>Hello, {!user ? 'Guest' : user?.email}</h3>
					<h2 className='checkout-title'>Your shopping Basket</h2>
					{transitions.map(
						(
							{ item, props: { y, height, ...rest }, key },
							index
						) => (
							<>
								<animated.div
									style={{
										height: height
											? height.interpolate(
													(height) => `${height}px`
											  )
											: 'auto',
										transform: y
											? y.interpolate(
													(y) =>
														`translate3d(0, ${y}px, 0)`
											  )
											: `translate3d(0, ${y}px, 0)`,
										...rest,
										margin: '20px 0',
										boxShadow:
											'8px 10px 11px 5px lightblue',
									}}
									key={key}
								>
									<CheckoutProduct
										key={key}
										id={item.id}
										title={item.title}
										image={item.image}
										price={item.price}
										rating={item.rating}
										index={index}
									/>
								</animated.div>
							</>
						)
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

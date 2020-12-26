import moment from 'moment';
import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { useTransition, animated } from 'react-spring';
import CheckoutProduct from './CheckoutProduct';
import { basket_field_fs, created_field_fs, gift_field_fs } from './Constants';
import './Order.css';

function Order({ order }) {
	const transitions = useTransition(
		order.data[`${basket_field_fs}`],
		(_, i) => i,
		{
			from: {
				transform: 'translateX(-100%) scale(0.5)',
			},
			leave: {
				transform: 'translateX(-100%) scale(0.1)',
			},
			enter: {
				transform: 'translateX(0) scale(1)',
			},
		}
	);

	const gift = order.data[`${gift_field_fs}`]
		? order.data[`${gift_field_fs}`]
		: false;

	return (
		<div className='order'>
			<h2>Order</h2>
			<p>
				{moment
					.unix(order.data[`${created_field_fs}`])
					.format('MMMM Do YYYY, h:mma')}
			</p>
			<p className='order-id'>
				<small>{order.id}</small>
			</p>
			{transitions?.map(({ item, props, key }, i) => (
				<animated.div style={props} key={key}>
					<CheckoutProduct
						id={item.id}
						title={item.title}
						image={item.image}
						price={item.price}
						rating={item.rating}
						hideBtn={true}
						index={i}
					/>
				</animated.div>
			))}
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<p
					style={{
						fontSize: '16px',
						letterSpacing: '0.5px',
						color: '#302c75bf',
					}}
				>
					<span>
						<input type='checkbox' checked={gift} readOnly />
					</span>
					<strong>Contain Gift</strong>
				</p>
				<CurrencyFormat
					renderText={(value) => (
						<h3 className='order-amount'>Order total: {value}</h3>
					)}
					decimalScale={2}
					value={order.data.amount / 100}
					displayType={'text'}
					thousandSeparator={true}
					prefix={'$'}
				/>
			</div>
		</div>
	);
}

export default Order;

import React, { useEffect, useState } from 'react';
import './Orders.css';
import { db } from './Firebase';
import { created_field_fs, orders_fs, users_fs } from './Constants';
import { useStateValue } from './StateProvider';
import Order from './Order';
import { useTransition, animated } from 'react-spring';

function Orders() {
	const [{ user }] = useStateValue();
	const [orders, setOrders] = useState([]);

	const transitions = useTransition(orders, (order) => order.id, {
		from: { opacity: 0 },
		leave: { opacity: 0 },
		enter: { opacity: 1 },
	});

	useEffect(() => {
		let isMounted = true;
		if (user) {
			if (isMounted) {
				db.collection(users_fs)
					.doc(user?.uid)
					.collection(orders_fs)
					.orderBy(created_field_fs, 'desc')
					.onSnapshot((snapshot) => {
						setOrders(
							snapshot.docs.map((doc) => {
								return {
									id: doc.id,
									data: doc.data(),
								};
							})
						);
					});
			}
		} else {
			setOrders([]);
		}

		return () => {
			isMounted = false;
		};
	}, [user]);

	return (
		<div className='orders'>
			<h1>Your Orders</h1>
			<div className='orders-container'>
				{transitions.length > 0 ? (
					transitions.map(({ item, props, key }) => (
						<animated.div style={props} key={key}>
							<Order order={item} />
						</animated.div>
					))
				) : (
					<div style={{ height: '200px' }}></div>
				)}
			</div>
		</div>
	);
}

export default Orders;

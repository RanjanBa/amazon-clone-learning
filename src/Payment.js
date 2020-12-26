import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import {
	checkout_page,
	empty_basket_action,
	orders_page,
	users_fs,
	orders_fs,
	basket_field_fs,
	amount_field_fs,
	created_field_fs,
	gift_field_fs,
} from './Constants';
import './Payment.css';
import { getBasketTotal } from './Reducer';
import { useStateValue } from './StateProvider';
import CurrencyFormat from 'react-currency-format';
import axios from './Axios';
import { db } from './Firebase';
import { useTransition, animated } from 'react-spring';

function Payment() {
	const history = useHistory();

	const [{ basket, user, gift }, dispatch] = useStateValue();

	const stripe = useStripe();
	const elements = useElements();

	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [processing, setProcessing] = useState(false);
	const [succeeded, setSucceeded] = useState(false);
	const [clientSecret, setClientSecret] = useState('');

	const [items, setItems] = useState([...basket]);

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

	useEffect(() => {
		const getClientSecret = async () => {
			try {
				const resposne = await axios({
					method: 'post',
					url: `/payments/create?total=${
						getBasketTotal(basket) * 100
					}`,
				});

				console.log('response from cloud func');
				console.log(resposne);

				setClientSecret(resposne.data.clientSecret);
			} catch (err) {
				console.log(err);
			}
		};

		getClientSecret();

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
	}, [basket, items]);

	console.log('The secret is  >>>', clientSecret);
	// console.log(gift);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setProcessing(true);

		const cardElement = elements.getElement(CardElement);

		const paymentMethod = await stripe.createPaymentMethod({
			type: 'card',
			card: cardElement,
		});

		await stripe
			.confirmCardPayment(clientSecret, {
				payment_method: paymentMethod.paymentMethod.id,
			})
			.then(({ paymentIntent }) => {
				setSucceeded(true);
				setError(null);
				setProcessing(false);

				dispatch({ type: empty_basket_action });
				history.replace(orders_page);

				const data = {};
				data[`${basket_field_fs}`] = basket;
				data[`${amount_field_fs}`] = paymentIntent.amount;
				data[`${created_field_fs}`] = paymentIntent.created;
				data[`${gift_field_fs}`] = gift;
				db.collection(users_fs)
					.doc(user?.uid)
					.collection(orders_fs)
					.doc(paymentIntent.id)
					.set(data);
			})
			.catch((err) => console.log(err));
	};

	const handleChange = (event) => {
		console.log(event.complete);
		setDisabled(!event.complete);
		setError(event.error ? event.error.message : '');
	};

	return (
		<div className='payment'>
			<div className='payment-container'>
				<h1>
					Checkout (
					<Link to={checkout_page}>{basket?.length} items</Link>)
				</h1>
				<div className='payment-section'>
					<div className='payment-section-title'>
						<h3>Delivery Address</h3>
					</div>

					<div className='payment-section-address'>
						<p>{user?.email}</p>
						<p>123 React Web</p>
						<p>Guwahati, Assam</p>
					</div>
				</div>
				{gift ? (
					<div
						style={{
							paddingTop: '10px',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							letterSpacing: '1px',
						}}
					>
						<span
							style={{
								background: 'lightgreen',
								borderRadius: '200px',
								padding: '10px',
								boxShadow: '1px 1px 14px 8px lightgreen',
							}}
						>
							<strong>This order contain gift</strong>
						</span>
					</div>
				) : (
					<></>
				)}

				<div className='payment-section'>
					<div className='payment-section-title'>
						<h3>Review Items and delivery</h3>
					</div>
					<div className='payment-section-items'>
						{transitions.map(
							(
								{ item, props: { y, height, ...rest }, key },
								i
							) => (
								<animated.div
									key={key}
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
								>
									<CheckoutProduct
										key={key}
										id={item.id}
										title={item.title}
										image={item.image}
										price={item.price}
										rating={item.rating}
										index={i}
									/>
								</animated.div>
							)
						)}
					</div>
				</div>

				<div className='payment-section'>
					<div className='payment-section-title'>
						<h3>Payment Menthod</h3>
					</div>
					<div className='payment-section-details'>
						<form onSubmit={handleSubmit}>
							<CardElement onChange={handleChange} />
							<div className='payment-section-price-container'>
								<CurrencyFormat
									renderText={(value) => (
										<p>
											Order total: ({basket?.length}{' '}
											items):
											<strong>{value}</strong>
										</p>
									)}
									decimalScale={2}
									value={getBasketTotal(basket)}
									displayType={'text'}
									thousandSeparator={true}
									prefix={'$'}
								/>

								<button
									disabled={
										basket?.length === 0 ||
										processing ||
										disabled ||
										succeeded
									}
								>
									<span>
										{processing ? (
											<p>Processing</p>
										) : (
											'Buy Now'
										)}
									</span>
								</button>
							</div>
							{error && <div>{error}</div>}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Payment;

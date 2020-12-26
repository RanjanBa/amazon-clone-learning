import React from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './Reducer';
import { useHistory } from 'react-router-dom';
import { payment_page, set_gift_action } from './Constants';

function Subtotal() {
	const history = useHistory();
	const [{ basket, gift }, dispatch] = useStateValue();

	return (
		<div className='subtotal'>
			<CurrencyFormat
				renderText={(value) => (
					<>
						<p>
							total price({basket?.length} items):
							<strong>{value}</strong>
						</p>
						<small className='subtotal-gift'>
							<input
								type='checkbox'
								checked={gift}
								onChange={() =>
									dispatch({
										type: set_gift_action,
										payload: !gift,
									})
								}
							/>
							This order contains a gift
						</small>
					</>
				)}
				decimalScale={2}
				value={getBasketTotal(basket)}
				displayType={'text'}
				thousandSeparator={true}
				prefix={'$'}
			/>

			<button
				disabled={basket?.length === 0}
				onClick={(e) => history.push(payment_page)}
			>
				Proceed to checkout
			</button>
		</div>
	);
}

export default Subtotal;

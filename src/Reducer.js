import {
	add_to_basket_action,
	add_add_to_basket_listener,
	remove_add_to_basket_listener,
	add_remove_from_basket_listener,
	remove_remove_from_basket_listener,
	remove_from_basket_action,
	set_user_action,
	empty_basket_action,
	set_gift_action,
} from './Constants';
import { v4 as uuid } from 'uuid';

export const initialState = {
	basket: [],
	user: null,
	gift: false,
	add_to_basket_listeners: [],
	remove_from_basket_listeners: [],
};

//Selector
export const getBasketTotal = (basket) => {
	return basket?.reduce((amount, item) => item.price + amount, 0);
};

const reducer = (state, action) => {
	switch (action.type) {
		case add_add_to_basket_listener:
			return {
				...state,
				add_to_basket_listeners: [
					...state.add_to_basket_listeners,
					action.payload,
				],
			};
		case remove_add_to_basket_listener: {
			const newListener = state.add_to_basket_listeners.filter(
				(val) => val !== action.payload
			);

			return {
				...state,
				add_to_basket_listeners: newListener,
			};
		}
		case add_remove_from_basket_listener:
			return {
				...state,
				remove_from_basket_listeners: [
					...state.remove_from_basket_listeners,
					action.payload,
				],
			};
		case remove_remove_from_basket_listener: {
			const newListener = state.remove_from_basket_listeners.filter(
				(val) => val !== action.payload
			);

			return {
				...state,
				remove_from_basket_listeners: newListener,
			};
		}
		case add_to_basket_action: {
			let newBasket = [...state.basket, { ...action.item, key: uuid() }];

			for (const lis of state.add_to_basket_listeners) {
				lis(newBasket);
			}

			return {
				...state,
				basket: newBasket,
			};
		}
		case remove_from_basket_action: {
			let newBasket = [...state.basket];
			const index = action.payload.index;
			const id = action.payload.id;
			if (index >= 0 && index < state.basket.length) {
				newBasket.splice(index, 1);
			} else {
				console.log('basket length: ' + state.basket.length);
				console.warn(
					`Can't remove product at index ${index} with id : ${id}) as its not in basket!`
				);
			}

			for (const lis of state.remove_from_basket_listeners) {
				lis(newBasket);
			}

			return {
				...state,
				basket: newBasket,
			};
		}
		case set_gift_action: {
			return {
				...state,
				gift: action.payload,
			};
		}
		case empty_basket_action:
			return { ...state, basket: [] };
		case set_user_action:
			return {
				...state,
				user: action.user,
			};
		default:
			return state;
	}
};

export default reducer;

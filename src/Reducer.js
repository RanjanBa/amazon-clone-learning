import {
	add_to_basket_action,
	remove_from_basket_action,
	set_user_action,
} from './Constants';

export const initialState = {
	basket: [],
	user: null,
};

//Selector
export const getBasketTotal = (basket) => {
	return basket?.reduce((amount, item) => item.price + amount, 0);
};

const reducer = (state, action) => {
	switch (action.type) {
		case add_to_basket_action:
			return {
				...state,
				basket: [...state.basket, action.item],
			};
		case remove_from_basket_action:
			const index = state.basket.findIndex(
				(basketItem) => basketItem.id === action.id
			);
			let newBasket = [...state.basket];

			if (index >= 0) {
				newBasket.splice(index, 1);
			} else {
				console.warn(
					`Can't remove product (id: ${action.id}) as its not in basket!`
				);
			}

			return {
				...state,
				basket: newBasket,
			};
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

// Action constants
const add_to_basket_action = 'ADD_TO_BASKET';
const remove_from_basket_action = 'REMOVE_FROM_BASKET';
const set_user_action = 'SET_USER';
const empty_basket_action = 'EMPTY_BASKET';

// listeners
const add_add_to_basket_listener = 'ADD_ADD_TO_BASKET_LISTENER';
const remove_add_to_basket_listener = 'REMOVE_ADD_TO_BASKET_LISTENER';
const add_remove_from_basket_listener = 'ADD_REMOVE_FROM_BASKET_LISTENER';
const remove_remove_from_basket_listener = 'REMOVE_REMOVE_FROM_BASKET_LISTENER';
const set_gift_action = 'SET_GIFT_ACTION';

// Link page constants
const login_page = '/login';
const checkout_page = '/checkout';
const orders_page = '/orders';
const payment_page = '/payment';

// Cloud Firestore
const users_fs = 'users';
const orders_fs = 'orders';

// Cloud Firestore fields
const basket_field_fs = 'basket';
const amount_field_fs = 'amount';
const created_field_fs = 'created';
const gift_field_fs = 'gift';

export {
	add_to_basket_action,
	remove_from_basket_action,
	set_user_action,
	set_gift_action,
	empty_basket_action,
	add_add_to_basket_listener,
	remove_add_to_basket_listener,
	add_remove_from_basket_listener,
	remove_remove_from_basket_listener,
	login_page,
	checkout_page,
	orders_page,
	payment_page,
	users_fs,
	orders_fs,
	basket_field_fs,
	amount_field_fs,
	created_field_fs,
	gift_field_fs,
};

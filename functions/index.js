const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const { response } = require('express');
const stripe = require('stripe')(
	'sk_test_51HzzQUA8EM7qL2sbSTFrZlYtqCZZhvAEjDy8E7k8DuxGDEnGGjGt9RinLN5IZ9eBGCfACsRg5xF0fc1m4ztIkRe800GdOtXBpz'
);

// API

// App config
const app = express();

// Midlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API Routes
app.get('/', (request, response) => response.status(200).send('hello world'));

app.post('/payments/create', async (request, response) => {
	try {
		const total = request.query.total;

		console.log('Payment request Received for this amount >>> ', total);
		const paymentIntent = await stripe.paymentIntents.create({
			amount: total,
			currency: 'INR',
		});

		// OK - Created
		response
			.status(201)
			.send({ clientSecret: paymentIntent.client_secret });
	} catch (err) {
		response.status(500).json({ status: 500, message: err.message });
	}
});

// Listen command
exports.api = functions.https.onRequest(app);

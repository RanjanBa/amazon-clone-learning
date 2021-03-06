import React, { useState } from 'react';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import { auth } from './Firebase';

function Login() {
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [isSigningIn, setSigningIn] = useState(false);

	const signIn = (e) => {
		e.preventDefault();
		setSigningIn(true);
		auth.signInWithEmailAndPassword(email, password)
			.then((auth) => {
				setSigningIn(false);
				history.push('/');
			})
			.catch((error) => {
				alert(error.message);
				setSigningIn(false);
			});
	};

	const createAccount = (e) => {
		e.preventDefault();

		auth.createUserWithEmailAndPassword(email, password)
			.then((auth) => history.push('/'))
			.catch((error) => alert(error.message));
	};

	return (
		<div className='login'>
			<Link to='/'>
				<img
					src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
					alt=''
					className='login-logo'
				/>
			</Link>

			<div className='login-container'>
				<h1>Sign In</h1>
				<form>
					<h5>Email</h5>
					<input
						type='text'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<h5>Password</h5>
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<button
						type='submit'
						className='login-btn'
						onClick={signIn}
						disabled={isSigningIn}
					>
						Sign in
					</button>
				</form>

				<p>
					By signing-in you agree to Amazon's conditions of use and
					sale. Please see out Privacy Notice, our Cookies Notice and
					our Interest-based Ads Notice.
				</p>

				<button
					disabled={isSigningIn}
					className='login-create-btn'
					onClick={createAccount}
				>
					Create Amazon Account
				</button>
			</div>
		</div>
	);
}

export default Login;

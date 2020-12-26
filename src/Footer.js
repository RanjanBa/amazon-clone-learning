import React from 'react';
import './Footer.css';

function Footer() {
	return (
		<div className='footer'>
			<div className='footer-top'>
				<div>
					<p className='footer-title'>Get to Know Us</p>

					<p className='footer-subtitle'>About us</p>
					<p className='footer-subtitle'>Careers</p>
					<p className='footer-subtitle'>Press Releases</p>
					<p className='footer-subtitle'>Amazon Cares</p>
					<p className='footer-subtitle'>Gift a Smile</p>
				</div>

				<div>
					<p className='footer-title'>Connect with Us</p>
					<p className='footer-subtitle'>Facebook</p>
					<p className='footer-subtitle'>Twitter</p>
					<p className='footer-subtitle'>Instagram</p>
				</div>

				<div>
					<p className='footer-title'>Make Money with Us</p>

					<p className='footer-subtitle'>Sell on Amazon</p>
					<p className='footer-subtitle'>
						Sell under Amazon Accelarator
					</p>
					<p className='footer-subtitle'>Become a Affiliate</p>
					<p className='footer-subtitle'>Fulfilment by Amazon</p>
					<p className='footer-subtitle'>Advertise Your Products</p>
					<p className='footer-subtitle'>Amazon Pay on Merchants</p>
				</div>

				<div>
					<p className='footer-title'>Let Us Help You</p>

					<p className='footer-subtitle'>COVID-19 and Amazon</p>
					<p className='footer-subtitle'>Your Account</p>
					<p className='footer-subtitle'>Returs Center</p>
					<p className='footer-subtitle'>100% Purchase</p>
					<p className='footer-subtitle'>Amazon App Download</p>
					<p className='footer-subtitle'>Amazon Assistant Download</p>
					<p className='footer-subtitle'>Help</p>
				</div>
			</div>
			<div className='footer-middle'>
				<img
					src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'
					alt=''
					className='footer-logo'
				/>
			</div>
			<div className='footer-bottom'>
				<p>Conditions of Use & Sale</p>
				<p>Privacy Notice</p>
				<p>Interest-Based Ads</p>
				<p>@1996-2020,Amazon.com, Inc. or its affiliates</p>
			</div>
		</div>
	);
}

export default Footer;

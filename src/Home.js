import React from 'react';
import './Home.css';
import Product from './Product';

function Home() {
	return (
		<div className='home'>
			<div className='home-container'>
				<img
					src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg'
					alt=''
					className='home-bg-image'
				/>

				<div className='home-row'>
					<Product
						id={1}
						image='https://m.media-amazon.com/images/I/51WIKlio9qL.jpg'
						title='The lean startup'
						price={29.99}
						rating={5}
					/>
					<Product
						id={2}
						image='https://images-na.ssl-images-amazon.com/images/I/51njb2LmQHL.jpg'
						title='Internet of things'
						price={15.99}
						rating={4}
					/>
				</div>

				<div className='home-row'>
					<Product
						id={3}
						image='https://m.media-amazon.com/images/I/41ju6JBCJmL.jpg'
						title='Rework'
						price={9.99}
						rating={4}
					/>
					<Product
						id={4}
						image='https://m.media-amazon.com/images/I/516iAO9WzlL.jpg'
						title='Beginning Programming with Python For Dummies'
						price={39.99}
						rating={1}
					/>
					<Product
						id={5}
						image='https://m.media-amazon.com/images/I/51X-pD3qaKL.jpg'
						title='Computer Programming: Learn Any Programming Language In 2 Hours Or Less'
						price={999.99}
						rating={3}
					/>
				</div>

				<div className='home-row'>
					<Product
						id={6}
						image='https://m.media-amazon.com/images/I/41hWLzgKJgL.jpg'
						title='Python: For Beginners: A Crash Course Guide To Learn Python in 1 Week (coding, programming, web-programming, programmer)'
						price={59.99}
						rating={2}
					/>
					<Product
						id={7}
						image='https://m.media-amazon.com/images/I/41B1hKiG9QL._SX260_.jpg'
						title='The Beginner’s Guide to Programming - e book: Techniques Of Writing ,Listing,Optimizing Your Program - Ebook'
						price={0}
						rating={2}
					/>
				</div>
			</div>
		</div>
	);
}

export default Home;

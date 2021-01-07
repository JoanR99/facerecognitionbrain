import React from 'react';

const Navigation = ({ onRouteChange, route }) => {
	if (route === 'signin') {
		return (
			<nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<p
					onClick={() => onRouteChange('register')}
					className="f3 link dim black underline pa3 pointer"
				>
					Register
				</p>
			</nav>
		);
	} else if (route === 'home') {
		return (
			<nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<p
					onClick={() => {
						onRouteChange('signin');
					}}
					className="f3 link dim black underline pa3 pointer"
				>
					Sign out
				</p>
			</nav>
		);
	} else if (route == 'register') {
		return (
			<nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<p
					onClick={() => onRouteChange('signin')}
					className="f3 link dim black underline pa3 pointer"
				>
					Sign in
				</p>
			</nav>
		);
	}
};

export default Navigation;

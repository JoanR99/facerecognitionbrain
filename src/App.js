import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css';

const particlesOptions = {
	particles: {
		number: {
			value: 10,
			density: {
				enable: true,
				value_area: 100,
			},
		},
	},
};

class App extends Component {
	render() {
		return (
			<div className="App">
				<Particles params={particlesOptions} className="particles" />
				<Navigation />
				<Logo />
				<Rank />
				<ImageLinkForm />
			</div>
		);
	}
}

export default App;

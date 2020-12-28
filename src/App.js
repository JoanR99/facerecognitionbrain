import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';

const app = new Clarifai.App({
	apiKey: 'c956288478554f6bbeb25b86dd84d296',
});

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
	constructor(props) {
		super(props);
		this.state = {
			input: '',
			imageURL: '',
			box: {},
			route: 'signin',
			isSignedIn: false,
		};
	}

	calculateFaceLocation = (coords) => {
		const clarifaiFace =
			coords.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputimage');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - clarifaiFace.right_col * width,
			bottomRow: height - clarifaiFace.bottom_row * height,
		};
	};

	displayFaceBox = (box) => {
		this.setState({ box: box });
	};

	onInputChanges = (event) => {
		this.setState({ input: event.target.value });
	};

	onButtonSubmit = () => {
		this.setState({ imageURL: this.state.input });
		app.models
			.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
			.then((response) =>
				this.displayFaceBox(this.calculateFaceLocation(response))
			)
			.catch((err) => console.log(err));
	};

	onRouteChange = (route) => {
		if (this.state.route === 'singnout') {
			this.setState({ isSignedIn: false });
		} else if (this.state.route === 'home') {
			this.setState({ isSignedIn: true });
		}
		this.setState({ route: route });
	};
	render() {
		return (
			<div className="App">
				<Particles params={particlesOptions} className="particles" />
				<Navigation
					onRouteChange={this.onRouteChange}
					isSignedIn={this.state.isSignedIn}
				/>
				{this.state.route === 'home' ? (
					<div>
						<Logo />
						<Rank />
						<ImageLinkForm
							onInputChanges={this.onInputChanges}
							onButtonSubmit={this.onButtonSubmit}
						/>
						{this.state.imageURL === '' ? (
							<div></div>
						) : (
							<FaceRecognition
								imageURL={this.state.imageURL}
								box={this.state.box}
							/>
						)}
					</div>
				) : this.state.route === 'signin' ? (
					<Signin onRouteChange={this.onRouteChange} />
				) : (
					<Register onRouteChange={this.onRouteChange} />
				)}
			</div>
		);
	}
}

export default App;

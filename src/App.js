import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
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

const initialState = {
	input: '',
	imageURL: '',
	box: {},
	route: 'signin',
	user: {
		id: '',
		name: '',
		entries: 0,
	},
};

class App extends Component {
	constructor(props) {
		super(props);
		this.state = initialState;
	}

	loadUser = (data) => {
		this.setState({
			user: {
				id: data.id,
				name: data.name,
				entries: data.entries,
			},
		});
	};

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
		fetch('https://whispering-tor-13057.herokuapp.com/imageUrl', {
			method: 'post',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				input: this.state.input,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response) {
					fetch('https://whispering-tor-13057.herokuapp.com/image', {
						method: 'put',
						headers: { 'content-type': 'application/json' },
						body: JSON.stringify({
							id: this.state.user.id,
						}),
					})
						.then((response) => response.json())
						.then((count) => {
							this.setState(Object.assign(this.state.user, { entries: count }));
						})
						.catch(console.log);
				}
				return this.displayFaceBox(this.calculateFaceLocation(response));
			})
			.catch((err) => console.log(err));
	};

	onRouteChange = (route) => {
		this.setState({ route: route });
		if (this.state.route === 'signin' || this.state.route === 'register') {
			this.setState({ ...initialState, route: route });
		}
	};
	render() {
		return (
			<div className="App">
				<Particles params={particlesOptions} className="particles" />
				<Navigation
					onRouteChange={this.onRouteChange}
					route={this.state.route}
				/>
				{this.state.route === 'home' ? (
					<div>
						<Logo />
						<Rank
							name={this.state.user.name}
							entries={this.state.user.entries}
						/>
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
					<Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
				) : (
					<Register
						loadUser={this.loadUser}
						onRouteChange={this.onRouteChange}
					/>
				)}
			</div>
		);
	}
}

export default App;

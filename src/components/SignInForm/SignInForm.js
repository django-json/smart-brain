import React, { Component } from 'react';

class SignInForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: ''
		};
	}

	onEmailChange = (event) => {
		this.setState({ signInEmail: event.target.value });
	};

	onPasswordChange = (event) => {
		this.setState({ signInPassword: event.target.value });
	}

	onSignInSubmit = () => {
		fetch('https://blooming-woodland-39722.herokuapp.com/signin', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
		.then(response => response.json())
		.then(user => {
			if(user.id) {
				this.props.loadProfile(user);
				this.props.onRouteChange('home');
			}
			else {
				this.props.onRouteChange('signin');
			}
		});
	}

	render() {
		const { onRouteChange } = this.props;
		return(
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
				<main className="pa4 black-80">
				  <form className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input 
					        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="email" 
					        name="email-address"  
					        id="email-address" 
					        onChange = { this.onEmailChange }
				        />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
					        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="password" 
					        name="password"  
					        id="password" 
					        onChange = { this.onPasswordChange }
				        />
				      </div>
				    </fieldset>
				    <div className="">
				      <input onClick={ this.onSignInSubmit } className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="Sign in" />
				    </div>
				    <div className="lh-copy mt3">
				      <a onClick={ () => onRouteChange('register') } href="#0" className="f6 link dim black db pointer">Register</a>
				    </div>
				  </form>
				</main>
			</article>
		);
	}
}

export default SignInForm;
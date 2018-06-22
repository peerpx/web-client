import React, {Component, Fragment} from 'react'
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import {Input, Button, message, Form, Divider} from 'antd'

import Header from '../App/Header'
import {CenterCard} from '../App/CenterCard.style'

import actions from '../../redux/me/actions'
//--

const formItemLayout = {
	colon: false
}

const errorPassword = () => {
	message.error('Your password is not valid, please pick another one ! ✌️');
}

const	rand = Math.round(Math.random() * 1000)

//--

class UserCreate extends Component {

	state = {
		email: 'bm-'+rand+'@kappuccino.org',
		username: 'benjamin'+rand,
		password: 'benjamin123'
	}

	isPasswordValid = password => {
		// todo: manage this with regex
		return !!password
	}

	handleSubmit = e => {
		e.preventDefault()
		const {email, username, password} = this.state

		// Password is not goodd enought
		if(!this.isPasswordValid(password)) return errorPassword()

		// Signup
		this.props.signup({email, username, password})
	}

	handleInput = (field, e) => {
		this.setState({
			[field]: e.target.value
		})
	}

	// todo: manage diable auto complete

	render() {
		return (
			<Fragment>
				<Header/>

				<CenterCard>
					<CenterCard.Content>

						<h1>Create a new account</h1>

						<form onSubmit={this.handleSubmit}>

							<Form.Item label="Email" {...formItemLayout}>
								<Input type="text" value={this.state.email}
								       onChange={this.handleInput.bind(this, 'email')} />
							</Form.Item>

							<Form.Item label="Username" {...formItemLayout}>
								<Input type="text" value={this.state.username}
								       onChange={this.handleInput.bind(this, 'username')} />
							</Form.Item>

							<Form.Item label="Password" {...formItemLayout}>
								<Input type="password" value={this.state.password}
								       onChange={this.handleInput.bind(this, 'password')} />
							</Form.Item>

							<Button htmlType="submit" type="primary" size="large" className="full-width">Signup !</Button>

							<Divider>or</Divider>

							<Link to="/a/signin">Signin</Link>


						</form>


					</CenterCard.Content>
				</CenterCard>
			</Fragment>
		)
	}

}


export default connect(
	// mapStateToProps
	state => ({
	}),

	// mapDispatchToProps
	{
		signup: actions.signup
	}
)(UserCreate)

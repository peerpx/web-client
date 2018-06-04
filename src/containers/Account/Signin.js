import React, {Component} from 'react'
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {Form, Button, Input, Divider} from 'antd'

import actions from '../../redux/me/actions'

import Header from '../App/Header'
import {CenterCard} from '../App/CenterCard.style'

//--

const formItemLayout = {
	colon: false
}

//--

class Signin extends Component {

	state = {
		login: '',
		password: ''
	}

	handleSubmit = e => {
		e.preventDefault()
		this.props.login(this.state.login, this.state.password)
	}

	handleInput = (name, e) => {
		this.setState({
			[name]: e.target.value
		})
	}

	render() {

		return (
			<div>
				<Header/>

				<CenterCard>
					<CenterCard.Content>

						<h1>Login</h1>

						<Form onSubmit={this.handleSubmit} className="login-form">
							<Form.Item label="Login" {...formItemLayout}>
									<Input type="text" value={this.state.login}
									       onChange={this.handleInput.bind(this, 'login')}/>
							</Form.Item>

							<Form.Item label="Password" {...formItemLayout}>
								<Input type="password" value={this.state.password}
								       onChange={this.handleInput.bind(this, 'password')} autoComplete="off"/>
							</Form.Item>

							<Form.Item>
								<Button type="primary" htmlType="submit" size="large" className="fullWidth">Login</Button>
								<Link to="/a/recover" style={{float: 'right'}}>Lost your password</Link>
							</Form.Item>

							<Divider>or</Divider>

							<Link to="/a/signup">Create an account</Link>

						</Form>

					</CenterCard.Content>
				</CenterCard>

			</div>
		)
	}

}

const WrappedNormalLoginForm = Form.create()(Signin)

export default connect(
	// mapStateToProps
	state => ({
		isLoggedIn: state.Me.username !== null
	}),

	// mapDispatchToProps
	{
		login: actions.login
	}
)(WrappedNormalLoginForm)

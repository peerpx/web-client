import React, {Component} from 'react'
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {Form, Button, Input} from 'antd'

import Header from '../App/Header'
import {CenterCard} from '../App/CenterCard.style'

const formItemLayout = {
	colon: false
}

class Recover extends Component {

	state = {
		email: '',
		password: ''
	}

	handleSubmit = e => {
		e.preventDefault()

		console.log('Submit', this.state)
	}

	handleEmail = e => {
		this.setState({
			email: e.target.value
		})
	}

	render() {

		//const { getFieldDecorator } = this.props.form;

		return (
			<div>
				<Header/>

				<CenterCard>
					<CenterCard.Content>

						<h1>Recover your password</h1>

						<Form onSubmit={this.handleSubmit} className="login-form">
							<Form.Item label="Email" {...formItemLayout}>
								<Input type="email" onChange={this.handleEmail}/>
							</Form.Item>

							<Form.Item>
								<Button type="primary" htmlType="submit" size="large" className="fullWidth">Recover</Button>
							</Form.Item>

							<br />
							<Link to="/a/signin">Oops, I just remember my password</Link>

						</Form>

					</CenterCard.Content>
				</CenterCard>

			</div>
		)
	}

}

const RecoverForm = Form.create()(Recover)

export default connect(
	// mapStateToProps
	state => ({
		isLoggedIn: state.Me.username !== null
	}),

	// mapDispatchToProps
	{}
)(RecoverForm)

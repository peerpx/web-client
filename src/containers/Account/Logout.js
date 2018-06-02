import React, {Component} from 'react'
import {connect} from "react-redux"

import actions from '../../redux/me/actions'

import Header from '../App/Header'
import {CenterCard} from '../App/CenterCard.style'

class Logout extends Component {

	componentWillMount(){
		this.props.logout()
	}

	render() {

		return (
			<div>
				<Header/>

				<CenterCard>
					<CenterCard.Content>

						<h1>Logout</h1>
						<p>We will miss you !</p>

					</CenterCard.Content>
				</CenterCard>

			</div>
		)
	}

}

export default connect(
	// mapStateToProps
	state => ({

	}),

	// mapDispatchToProps
	{
		logout: actions.logout
	}
)(Logout)

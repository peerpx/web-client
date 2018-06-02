import React, {Component} from 'react'
import {connect} from "react-redux"

import Header from '../App/Header'

class Dashboard extends Component {

	render() {

		return (
			<div>
				<Header/>

				<h1>Dashboard</h1>


			</div>
		)
	}

}

export default connect(
	// mapStateToProps
	state => ({
		isLoggedIn: state.Me.username !== null
	}),

	// mapDispatchToProps
	{

	}
)(Dashboard)

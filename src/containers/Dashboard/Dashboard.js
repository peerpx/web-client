import React, {Component} from 'react'
import {connect} from "react-redux"

class Dashboard extends Component {

	render() {
		return (
			<div>
				Dashboard
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
	}
)(Dashboard)

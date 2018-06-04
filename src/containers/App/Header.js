import React, {Component} from 'react'
import {connect} from "react-redux"
import {Link} from 'react-router-dom'

import {HeaderWrapper, HeaderLeft, HeaderRight} from './HeaderWrapper.style'

class Header extends Component {

	render() {
		return (
			<HeaderWrapper>
				<HeaderLeft>
					<Link to="/" className="logo">Peerpx</Link>
				</HeaderLeft>

				<HeaderRight>
					{this.props.isLoggedIn &&
					<ul>
						<li>Bonjour {this.props.user.username}</li>
						<li><Link to="/a/me">My Account</Link></li>
						<li><Link to="/a/logout">Logout</Link></li>
					</ul>
					}

					{!this.props.isLoggedIn &&
					<ul>
						<li><Link to="/a/signin">Signin</Link></li>
						<li><Link to="/a/signup">Signup</Link></li>
					</ul>
					}

				</HeaderRight>
			</HeaderWrapper>
		)
	}
}


export default connect(
	// mapStateToProps
	state => ({
		isLoggedIn: !!state.Me.username,
		user: state.Me
	}),

	// mapDispatchToProps
	{}
)(Header)

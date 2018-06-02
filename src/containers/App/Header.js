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
					<div>
						Bonjour {this.props.user.username}
						&nbsp;
						<Link to="/logout">logout</Link>
					</div>
					}

					{!this.props.isLoggedIn &&
					<ul>
						<li><Link to="/signin">Se connecter</Link></li>
						<li><Link to="/signup">Créer un compte</Link></li>
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

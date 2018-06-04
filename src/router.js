import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'
import {connect} from 'react-redux'

import asyncComponent from './helpers/AsyncFunc'

import Dashboard from './containers/Dashboard/Dashboard'

const RestrictedRoute = ({component: Component, isLoggedIn, ...rest}) => (
	<Route {...rest}
	       render={props => isLoggedIn
		       ? <Component {...props} />
		       : <Redirect to={ {pathname: '/signin', state: {from: props.location}} } />}
	/>
)

const PublicRoutes = ({history, isLoggedIn}) => {
	return (
		<ConnectedRouter history={history}>
			<div>
				<Route exact path={'/'}  component={asyncComponent(() => import('./containers/Home/Home'))}/>
				<Route exact path={'/a'} component={asyncComponent(() => import('./containers/Home/Home'))}/>

				<Route exact path={'/a/signin'} component={asyncComponent(() => import('./containers/Account/Signin'))}/>
				<Route exact path={'/a/signup'} component={asyncComponent(() => import('./containers/Account/Signup'))}/>
				<Route exact path={'/a/logout'} component={asyncComponent(() => import('./containers/Account/Logout'))}/>
				<Route exact path={'/a/recover'} component={asyncComponent(() => import('./containers/Account/Recover'))}/>

				<RestrictedRoute path="/a/me" component={Dashboard} isLoggedIn={isLoggedIn}/>
			</div>
		</ConnectedRouter>
	)
}

export default connect(
	// mapStateToProps
	state => ({
		isLoggedIn: state.Me.username !== null
	}),
	// mapDispatchToProps
	{

	}
)(PublicRoutes)

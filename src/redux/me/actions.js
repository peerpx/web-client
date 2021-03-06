const actions = {
	MYPROFILE_LOADED: 'MYPROFILE_LOADED',

	CHECK_ME: 'CHECK_ME',

	LOGIN: 'LOGIN',
	LOGIN_SUCCESS: 'LOGIN_SUCCESS',

	LOGOUT: 'LOGOUT',
	LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',

	SIGNUP: 'SIGNUP',
	SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',

	// --

	checkMe: () => ({
		type: actions.CHECK_ME
	}),

	login: (login, password) => ({
		type: actions.LOGIN,
		payload: {login, password}
	}),

	logout: () => ({
		type: actions.LOGOUT
	}),

	signup: params => ({
		type: actions.SIGNUP,
		payload: params
	})

}

export default actions
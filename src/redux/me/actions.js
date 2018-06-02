const actions = {
	MYPROFILE_LOADED: 'MYPROFILE_LOADED',

	CHECK_ME: 'CHECK_ME',

	LOGIN: 'LOGIN',
	LOGIN_SUCCESS: 'LOGIN_SUCCESS',

	LOGOUT: 'LOGOUT',

	SIGNUP: 'SIGNUP',
	SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',

	// --

	checkMe: () => ({
		type: actions.CHECK_ME
	}),

	login: (login, password, remember) => ({
		type: actions.LOGIN,
		payload: {login, password, remember}
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
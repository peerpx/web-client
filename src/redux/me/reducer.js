import actions from './actions'

let initState = {}

export default function meReducer(state = initState, action) {

	const {type, payload} = action

	switch (type) {

		case actions.LOGIN_SUCCESS:
			return payload

		case actions.SIGNUP_SUCCESS:
			return payload

		case actions.LOGOUT:
			return {}

		default:
			return state
	}
}

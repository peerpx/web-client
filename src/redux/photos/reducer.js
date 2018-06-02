import actions from './actions'

const initState = {
	total: 0,
	data: []
}

export default function agenciesReducer(state = initState, action) {

	const {type, payload} = action

	switch (type) {

		case actions.SEARCH_PHOTOS_SUCCESS:
			return {
				...state,
				total: payload.Total,
				data: payload.Data
			}


		default:
			return state
	}
}

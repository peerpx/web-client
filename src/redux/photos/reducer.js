import actions from './actions'

const initState = {
	total: 0,
	offset: 10,
	data: []
}

export default function photosReducer(state = initState, action) {

	const {type, payload} = action

	switch (type) {

		case actions.UPLOAD_FILE:
			return {
				...state,
				data: [payload, ...state.data]
			}

		case actions.UPLOAD_FILE_PROGRESS:
			console.log('UPLOAD_FILE_PROGRESS', payload)
			return {
				...state,
				data: state.data.map(d => {
					if(d.id === payload.id) return {...payload}
					return d
				})
			}

		case actions.UPLOAD_FILE_SUCCESS:
			console.log('** UPLOAD_FILE_SUCCESS **', payload)
			return {
				...state,
				data: state.data.map(d => {
					if (d.id === payload.prev.id) return payload.next
					return d
				})
			}

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

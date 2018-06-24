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
			//console.log('UPLOAD_FILE_PROGRESS', {state, payload})

			return {
				...state,
				data: state.data.map(d => {
					if(d.id === payload.id) return {...d, upload: payload.upload}
					return d
				})
			}

		case actions.UPLOAD_FILE_SUCCESS:
			//console.log('** UPLOAD_FILE_SUCCESS **', payload)
			return {
				...state,
				data: state.data.map(d => {
					if (d.id === payload.prev.id) return {...payload.next, upload: payload.prev.upload}
					return d
				})
			}

		case actions.UPLOAD_FILE_DUPLICATED:
			//console.log('** UPLOAD_FILE_DUPLICATED **', payload)
			return {
				...state,
				data: state.data.filter(p => p.id !== payload)
			}

		case actions.SEARCH_PHOTOS_SUCCESS:
			return {
				...state,
				total: payload.Total,
				data: payload.Data || []
			}

		default:
			return state
	}
}

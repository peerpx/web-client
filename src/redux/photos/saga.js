import {all, takeEvery, put, fork} from 'redux-saga/effects'

import actions from './actions'
import * as api from '../../helpers/api.js'


export function* searchPhotos(){

	yield takeEvery(actions.SEARCH_PHOTOS, function* () {
		console.log('🦄 searchPhotos() !')

		try{
			const res = yield api.PhotoSearch()

			if(res.error){
				yield put({type: actions.SEARCH_PHOTOS_ERROR})
			}else{
				yield put({type: actions.SEARCH_PHOTOS_SUCCESS, payload: res})
			}

		} catch(err){
			console.log('🔥', err)
			yield put({type: actions.SEARCH_PHOTOS_ERROR})
		}

	})
}

export default function* rootSaga(){
	yield all([
		fork(searchPhotos),
	])
}

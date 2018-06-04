import {all, takeEvery, put, fork, call, take} from 'redux-saga/effects'
import {message} from 'antd'

import actions from './actions'
import * as api from '../../helpers/api.js'

const errorUpload = msg => {
	message.error(msg)
}

export function* searchPhotos(){

	yield takeEvery(actions.SEARCH_PHOTOS, function* () {
		//console.log('🦄 searchPhotos() !')

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

export function* uploadFiles(){

	function* uploadFile(file, props){

		const obj = {
			upload: true,
			progress: 0,
			id: Math.random(),
			preview: file.preview
		}

		// Create the Object in the DataStore
		yield put({type: actions.UPLOAD_FILE, payload: obj})
		//return

		// Starts the upload
		const upload = yield call(api.PhotoUploadProgress, file, props)

		// Tick the progress to the Store trough UPLOAD_FILE_PROGRESS
		try {
			let res
			while (true) {
				res = yield take(upload)
				console.log('>>>', res)

				if(res > 0){
					yield put({type: actions.UPLOAD_FILE_PROGRESS, payload: {...obj, progress: res}})
				}else
				if(res.code === 0){
					console.log('👏👏👏', res)
					yield put({type: actions.UPLOAD_FILE_SUCCESS, payload: {prev: obj, next: res.photoProps}})
				}

			}
		}
		catch(err){
			console.error('Fuck !', err)
			errorUpload(err.message)
		}
	}

	yield takeEvery(actions.UPLOAD_FILES, function* ({payload}){
		//console.log('[SAGA]', 'uploadFiles()', payload)
		const {files, props} = payload

		//return console.log(payload)

		yield all(files.map(file => call(uploadFile, file, props)))
	})

}


export default function* rootSaga(){
	yield all([
		fork(searchPhotos),
		fork(uploadFiles),
	])
}

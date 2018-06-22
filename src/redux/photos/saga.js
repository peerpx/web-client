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


	function* uploadFile(file, properties){

		const obj = {
			id: Math.random(),
			name: file.name,
			upload: {
				progress: 0,
				preview: file.preview
			}
		}

		// Create the Object in the DataStore
		yield put({type: actions.UPLOAD_FILE, payload: obj})

		// Starts the upload
		const upload = yield call(api.PhotoUploadProgress, file, properties)

		// Tick the progress to the Store trough UPLOAD_FILE_PROGRESS
		try {
			let res
			while (true) {
				res = yield take(upload)
				console.log('>>>', res, typeof res)

				if(res > 0){
					obj.upload.progress = res
					yield put({type: actions.UPLOAD_FILE_PROGRESS, payload: obj})
				}else
				if(res.success){
					console.log('👏👏👏', res)
					yield put({type: actions.UPLOAD_FILE_SUCCESS, payload: {prev: obj, next: res.data}})
					break // ??
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
		const {files} = payload

		//return console.log(payload)

		yield all(files.map(file => {
			const properties = {
				name: file.name
			}

			return call(uploadFile, file, properties)
		}))
	})

}


export default function* rootSaga(){
	yield all([
		fork(searchPhotos),
		fork(uploadFiles),
	])
}

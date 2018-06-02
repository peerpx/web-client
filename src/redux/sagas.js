import {all} from 'redux-saga/effects'

import meSagas from './me/saga'
import photosSagas from './photos/saga'


export default function* rootSaga(getState) {
	yield all([
		meSagas(),
		photosSagas()
	])
}

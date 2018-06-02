import {all, takeEvery, put, fork} from 'redux-saga/effects'
import {push} from 'react-router-redux'
import {message} from 'antd'

import actions from './actions'
import * as api from '../../helpers/api.js'
import {DisplayGenericError} from '../../helpers/utility'

const loginSuccessMessage = username => {
	message.success(`✌️ Hello ${username}!`);
}

const signupSuccessMessage = username => {
	message.success(`✌️ Hello ${username}, nice to meet you. Hold tight, we will redirect you to your account️...`);
}

//--

export function* checkMe() {
	yield takeEvery(actions.CHECK_ME, function* () {
		console.info('[SAGA] me.checkMe()')

		try{
			const user = yield api.UserMe()

			if(user){
				yield put({type: actions.LOGIN_SUCCESS, payload: user})
			}

		} catch (err) {
			console.error('🔥 Error CheckMe', err.message)
			DisplayGenericError(err.message)
		}

	})
}

export function* login(){
	yield takeEvery(actions.LOGIN, function* ({payload}) {
		console.info('[SAGA] me.login()', payload)

		const {login, password, remember} = payload

		try{
			const user = yield api.UserLogin(login, password, remember)

			yield put({type: actions.LOGIN_SUCCESS, payload: user})
			loginSuccessMessage(user.username)

		} catch(err){
			console.error('🔥 Error Login', err.message)
			DisplayGenericError(err.message)
		}

	})
}

export function* logout() {
	yield takeEvery(actions.LOGOUT, function* () {
		console.info('[SAGA] me.logout()')
		yield put(push('/'))
	})
}

export function* signup(){
	yield takeEvery(actions.SIGNUP, function* ({payload}) {
		console.info('[SAGA] me.signup()', payload)

		const {email, username, password} = payload

		try{
			const user = yield api.UserSignup(email, username, password)

			yield put({type: actions.SIGNUP_SUCCESS, payload: user})
			signupSuccessMessage(user.username)

		} catch(err){
			console.error('🔥 Error signup', err.message)
			DisplayGenericError(err.message)
		}

	})
}

export function* signupRedirect(){
	const delay = (ms) => new Promise(res => setTimeout(res, ms))

	yield takeEvery(actions.SIGNUP_SUCCESS, function* ({payload}) {
		console.info('[SAGA] me.signupRedirect()', payload)

		yield delay(3000)
		yield put(push('/account'))
	})
}

//--

export default function* rootSaga(){
	yield all([
		fork(checkMe),
		fork(login),
		fork(logout),
		fork(signup),
		fork(signupRedirect)
	])
}
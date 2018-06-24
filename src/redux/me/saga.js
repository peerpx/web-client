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
		//console.info('[SAGA] me.checkMe()')

		const cookie = getCookie('ppx')
		if(!cookie) return

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
		//console.info('[SAGA] me.login()', payload)

		const {login, password} = payload

		try{
			const user = yield api.UserLogin(login, password)

			yield put({type: actions.LOGIN_SUCCESS, payload: user})
			loginSuccessMessage(user.username)
			yield put(push('/a/me/account'))

		} catch(err){
			console.error('🔥 Error Login', err.message)
			DisplayGenericError(err.message)
		}

	})
}

export function* logout() {
	yield takeEvery(actions.LOGOUT, function* () {
		//console.info('[SAGA] me.logout()')

		try{
			yield api.UserLogout()

			document.cookie = 'ppx=; expires=Thu, 25 Jun 2015 17:09:01 GMT;'; // 👶 number 2
			yield put({type: actions.LOGOUT_SUCCESS})
			yield put(push('/'))

		} catch (err) {
			console.error('🔥 Error Logout', err.message)
		}

	})
}

export function* signup(){
	yield takeEvery(actions.SIGNUP, function* ({payload}) {
		//console.info('[SAGA] me.signup()', payload)

		const {email, username, password} = payload

		try{
			const user = yield api.UserSignup(email, username, password)

			// Display a message "login success"
			signupSuccessMessage(user.username)

			// Autolog the user
			yield put({type: actions.LOGIN, payload: {login:username, password}})

			// Redirect to the acccount
			yield put({type: actions.SIGNUP_SUCCESS, payload: user})

		} catch(err){
			console.error('🔥 Error signup', err.message)
			DisplayGenericError(err.message)
		}

	})
}

export function* signupRedirect(){
	const delay = (ms) => new Promise(res => setTimeout(res, ms))

	yield takeEvery(actions.SIGNUP_SUCCESS, function* ({payload}) {
		//console.info('[SAGA] me.signupRedirect()', payload)

		yield delay(3000)
		yield put(push('/a/me/account'))
	})
}

//--

function getCookie(name) {
	const value = "; " + document.cookie;
	const parts = value.split("; " + name + "=");
	if (parts.length === 2) return parts.pop().split(";").shift();
}


export default function* rootSaga(){
	yield all([
		fork(checkMe),
		fork(login),
		fork(logout),
		fork(signup),
		fork(signupRedirect)
	])
}
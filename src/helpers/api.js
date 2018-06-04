import axios from 'axios'
import {eventChannel, END} from 'redux-saga'

const instance = axios.create({
	baseURL: (process.env.REACT_APP_API_BASE_URL || '') + '/api',

	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'X-Api-Key': 'QmU2TQthpXDj8QNK6jyqpWsjgDmr3E9Hn3F6zTahGGvZUC'
	},

	mode: 'cors',
	withCredentials: true,
	credentials: 'same-origin',

	validateStatus: function (status) {
		return true
		//return status >= 200 && status < 300; // default
	}
})


//-- Photo

export const PhotoSearch = function(){
	return instance.get('/v1/photo/search')
		.then(res => res.data)
}

export const PhotoUpdate = function(photo){
	return instance.put('/v1/photo', photo)
		.then(res => {
			if(res.data.code > 0) throw res.data.code
			return res.data.photo
		})
}

export const PhotoDelete = function(hash){
	return instance.delete(`/v1/photo/${hash}`)
		.then(res => {
			if(res.status !== 200) throw new Error('Error️')
			return true
		})
}

export const PhotoUploadProgress = function(file, props={}){
	console.log("uploadProgress()", file)

	const data = new FormData()
	data.append('file', file)
	data.append('data', "{}")

	return eventChannel(emitter => {

		instance.post('/v1/photo', data, {
			onUploadProgress: (progressEvent) => {
				const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
				emitter(percent)
			}
		})
		.then(res => {
			//console.log('RAW', res)

			if(res.status >= 200 && res.status < 300) {
				emitter(res.data)
				emitter(END)
			}else{
				emitter(new Error('Error while uploading a picture code:'+res.status))
			}

		})

		// The subscriber must return an unsubscribe function
		return () => {}
	})

}

//-- User

export const UserLogin = function(login, password){

	console.log('[API] UserLogin')

	const data = {
		Login: login,
		Password: password
	}

	return instance.post('/v1/user/login', data)
		.then(res => {
			const data = res.data
			if(res.status === 200) return data.User
			throw new Error(data.Msg || data.message || '/user/login error')
		})
}

export const UserMe = function(){

	return instance.get('/v1/user/me')
		.then(res => {
			const data = res.data
			if(res.status === 200) return data
			throw new Error(data.Msg || res.data.message || '/user/me error')
		})

}

export const UserSignup = function(email, username, password){

	const data = {
		Email: email,
		Username: username,
		Password: password
	}

	return instance.post('/v1/user', data)
		.then(res => {
			const {User, Msg} = res.data
			if(res.status === 201) return User
			throw new Error(Msg || res.data.message || '/user error')
		})

}



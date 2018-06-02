import axios from 'axios'

const instance = axios.create({
	baseURL: process.env.REACT_APP_API_BASE_URL,

	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'X-Api-Key': process.env.REACT_APP_API_KEY
	},

	mode: 'no-cors',
	//withCredentials: true,
	credentials: 'same-origin',
	//crossdomain: true,

	validateStatus: function (status) {
		return true
		//return status >= 200 && status < 300; // default
	}
})

//-- Photo

export const PhotoSearch = function(){
	return instance.get('photo/search')
		.then(res => res.data)
}

export const PhotoUpdate = function(photo){
	return instance.put('photo', photo)
		.then(res => {
			if(res.data.code > 0) throw res.data.code
			return res.data.photo
		})
}

export const PhotoDelete = function(hash){
	return instance.delete(`photo/${hash}`)
		.then(res => {
			if(res.status !== 200) throw new Error('Error️')
			return true
		})
}

//-- User

export const UserLogin = function(login, password, remember){

	const data = {
		Login: login,
		Password: password
	}

	return instance.post('user/login', data)
		.then(res => {
			const {User, Msg} = res.data
			if(res.status === 200) return User
			throw new Error(Msg || res.data.message || '/user/login error')
		})
}

export const UserMe = function(){

	return instance.post('user/me')
		.then(res => {
			const {User, Msg} = res.data
			if(res.status === 200) return User
			throw new Error(Msg || res.data.message || '/user/me error')
		})

}

export const UserSignup = function(email, username, password){

	const data = {
		Email: email,
		Username: username,
		Password: password
	}

	return instance.post('user', data)
		.then(res => {
			const {User, Msg} = res.data
			if(res.status === 201) return User
			throw new Error(Msg || res.data.message || '/user error')
		})

}



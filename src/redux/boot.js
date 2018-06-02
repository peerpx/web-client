import {store} from './store'
import authActions from './me/actions'

export default () =>
	new Promise(() => {
		store.dispatch(authActions.checkMe())
	})
import React from 'react'
import {Provider} from 'react-redux'
//import {ThemeProvider} from 'styled-components'
import AppHolder from './dashAppStyle'

import PublicRoutes from './router'
//import AppLocale from './languageProvider'
//import {themeConfig} from './config'
import Boot from './redux/boot'
import {store, history} from './redux/store'


const App = () => (
	<AppHolder>
		<Provider store={store}>
			<PublicRoutes history={history}/>
		</Provider>
	</AppHolder>
)

Boot()
	.then(() => App())
	.catch(error => console.error(error))

export default App
//export {AppLocale}

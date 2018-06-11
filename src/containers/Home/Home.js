import React, {Component, Fragment} from 'react'
import {connect} from "react-redux"

import actions from '../../redux/photos/actions'

import Header from '../App/Header'
import Uploader from '../../components/uploader'
import Centered from '../App/CenterContent.style'
import PhotoCard from '../App/PhotoCard'

class Home extends Component {

	componentDidMount(){
		this.props.searchPhotos()
	}

	handleSelectFile = (files, cb) => {
		const props = []
		this.props.uploadFiles(files, props)
		cb()
	}

	render() {

		return (
			<div>

				<Header />

				<div style={{padding: '15px' }}>

					{this.props.isLoggedIn &&
					<Fragment>
						<Uploader selectFile={this.handleSelectFile} />
						<br /><br />
					</Fragment>
					}

					<Centered>
						<Centered.Content>

							{this.props.photos.map((p, index) =>
								<PhotoCard key={p.Hash || index} photo={p} />
							)}

						</Centered.Content>
					</Centered>

					{/*<pre>{ JSON.stringify(this.props.photos, null, 2) }</pre>*/}
				</div>

			</div>
		)
	}
}


export default connect(
	// mapStateToProps
	state => ({
		isLoggedIn: !!state.Me.username,
		photos: state.Photos.data || []
	}),

	// mapDispatchToProps
	{
		searchPhotos: actions.searchPhotos,
		uploadFiles: actions.uploadFiles
	}
)(Home)

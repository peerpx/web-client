import React, {Component, Fragment} from 'react'
import {connect} from "react-redux"

import actions from '../../redux/photos/actions'

import PhotoThumbnail from '../../components/photo-thumbnail'
import Header from '../App/Header'
import Uploader from '../../components/uploader'

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

		const photos = this.props.photos

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

					Nous avons {this.props.total} photos !

					<ul>
						{photos.map((photo, index) =>
							<li key={index}>
								{/*<pre>{JSON.stringify(photo, null, 2)}</pre>*/}

								{photo.upload &&
								<span>Upload: {photo.progress} %</span>
								}

								{!photo.upload &&
									<PhotoThumbnail photo={photo} width={150} />
								}
							</li>
						)}
					</ul>

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
		total: state.Photos.total || 0,
		photos: state.Photos.data || [0]
	}),

	// mapDispatchToProps
	{
		searchPhotos: actions.searchPhotos,
		uploadFiles: actions.uploadFiles
	}
)(Home)

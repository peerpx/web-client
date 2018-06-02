import React, {Component} from 'react'
import {connect} from "react-redux"

import actions from '../../redux/photos/actions'

import PhotoThumbnail from '../../components/photo-thumbnail'
import Header from '../App/Header'

class Home extends Component {

	componentDidMount(){
		this.props.searchPhotos()
	}

	render() {

		const photos = this.props.photos

		return (
			<div>

				<Header />


				Nous avons {this.props.total} photos !

				<ul>
					{photos.map(photo =>
						<li key={photo.Hash}><PhotoThumbnail photo={photo} width={150} /></li>
					)}
				</ul>

				{/*<pre>{ JSON.stringify(this.props.photos, null, 2) }</pre>*/}

			</div>
		)
	}
}


export default connect(
	// mapStateToProps
	state => ({
		total: state.Photos.total || 0,
		photos: state.Photos.data || [0]
	}),

	// mapDispatchToProps
	{
		searchPhotos: actions.searchPhotos
	}
)(Home)

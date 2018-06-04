import React,{Component} from 'react'
import styled from 'styled-components'

import PhotoThumbnail from '../../components/photo-thumbnail'

const Wrapper = styled.div`
	margin-bottom: 20px;
	position: relative;

	.progress{
		position: absolute;
		top: 0; right: 0; left: 0;
		transition: all 350ms;
		
		&.completed{
			width: 100%;
			opacity: 0;
		}
		
		.bar{
			height: 3px;
			background: #ff7c8c;
			transition: all 350ms;
		}
	}
	
	.media{
		img{
			width: 100%;
			height: auto;
		}
	}
`

class PhotoCard extends Component {

	render() {

		const photo = this.props.photo

		return (
			<Wrapper>
				{/*<pre>{JSON.stringify(this.props.photo, null, 2)}</pre>*/}

				{photo.progress &&
				<div className={`progress ${photo.progress === 100 ? 'completed' : ''}`}>
					<div className="bar" style={{width: photo.progress+'%'}}/>
				</div>
				}

				<div className="media">
					{photo.preview && <img src={photo.preview} /> }
					{!photo.preview && <PhotoThumbnail photo={this.props.photo} width={900} />}
				</div>



			</Wrapper>
		)
	}
}

export default PhotoCard
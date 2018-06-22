import React,{Component} from 'react'
import styled from 'styled-components'

import PhotoThumbnail from '../../components/photo-thumbnail'

const Wrapper = styled.div`
	margin-bottom: 20px;
	position: relative;

	.progress{
		position: absolute;
		top: 0; right: 0; left: 0;
		z-index: 2;
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
		position: relative;

		img{
			width: 100%;
			display: block;
			position: relative;
			z-index: 1;
			
			&.behind-blob{
				position: absolute;
				top: 0;
				left: 0;
				filter: grayscale(100%);
				z-index: 0;
				opacity: 0;
			}
		}
		
	}
`

class PhotoCard extends Component {

	render() {

		const photo = this.props.photo

		return (
			<Wrapper>
				{/*<pre>{JSON.stringify(this.props.photo, null, 2)}</pre>*/}

				{photo.upload &&
				<div className={`progress ${photo.upload.progress === 100 ? 'completed' : ''}`}>
					<div className="bar" style={{width: photo.upload.progress+'%'}}/>
				</div>
				}

				<div className="media">
					{photo.upload &&
					<img src={photo.upload.preview} alt={photo.hash} />
					}

					{photo.hash &&
						<PhotoThumbnail photo={photo} width={900}
						                className={!!photo.upload ? 'behind-blob' : ''} />
					}
				</div>

				<div className="name">
					{photo.name}
				</div>

			</Wrapper>
		)
	}
}

export default PhotoCard
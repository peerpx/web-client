import React, {Component} from 'react'
import Dropzone from 'react-dropzone'
import styled from 'styled-components'
import {Icon, Spin} from 'antd'

const Wrapper = styled.div`
	background: #fafafa;
	border-radius: 5px;
	text-align: center;
	padding: 25px 0;
	//margin: 50px 0;
	border: 1px dashed #d9d9d9;
	transition: all 300ms;
	cursor: pointer;
	
	&:hover{
    border-color: #a7a7a7;
	}
	
	.anticon-inbox{
		font-size: 32px;
	}
	
	h3{
		margin: 10px 0;
		padding: 0;
	}

`

const antIcon = <Icon type="loading" style={{ fontSize: 24, marginBottom: 20 }} spin />;


class UploaderZone extends Component{

	state = {
		notAccepted: false,
		sending: false
	}

	onImageDrop = (files) => {
		if(!files.length){
			//if(this.props.accept && !this.props.accept.match(file.type)){
			setTimeout(() => this.setState({notAccepted: false}), 2000)
			return this.setState({notAccepted: true})
		}

		this.setState(() => ({
			sending: true
		}))

		this.props.selectFile(files, () => {

			this.setState({
				sending: false
			})

		})

	}

	render(){

		const style = Object.assign({}, this.props.style || {})

		return (
			<Dropzone
				className="dropzone"
				style={style}
				multiple={true}
				accept={'image/jpeg'}
				onDrop={this.onImageDrop}>

				{ ({ isDragActive, isDragReject }) => {

					return (
						<Wrapper>
							<Icon type="inbox" />
							<h3>Drop a file !</h3>
							{ this.state.sending && <Spin indicator={antIcon} /> }

							{/*{ isDragActive && <p>Ce type de fichier est autorisé</p> }*/}
							{ isDragReject && <p>Ce type de fichier n'est autorisé</p> }
							{ this.state.sending && <p>Envoi du fichier en cours...</p> }
							{ this.state.notAccepted && <p>Ce type de fichier n'est pas autorisé</p> }
						</Wrapper>
					)

				}}

			</Dropzone>
		)
	}

}

export default UploaderZone
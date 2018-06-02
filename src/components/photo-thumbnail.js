import React from 'react'

export default ({photo, width=50}) => {
	const url = `${process.env.REACT_APP_API_BASE_URL}/photo/${photo.Hash}/width/${width}`

	return (
		<img src={url} alt="item"/>
	)
}
import React from 'react'

export default ({photo, width=50}) => {
	const urlWidth = width > photo.width ? photo.width : width
	const url = `${process.env.REACT_APP_API_BASE_URL || ''}/api/v1/photo/${photo.hash}/width/${urlWidth}`

	// todo : faire  height + width au bon ratio ci dessus

	return (
		<img src={url} alt="item" width={photo.width} height={photo.height} />
	)
}
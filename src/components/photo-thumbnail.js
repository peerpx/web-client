import React from 'react'

export default ({photo, width=50, className=''}) => {
	const urlWidth = width > photo.width ? photo.width : width
	const url = `${process.env.REACT_APP_API_BASE_URL || ''}/api/v1/photo/${photo.hash}/width/${urlWidth}`

	const ratio = width / photo.width
	const nextWidth = width
	const nextHeight = Math.round(photo.height * ratio)



	return (
		<img src={url} width={nextWidth} height={nextHeight}
		     className={className} alt={photo.name || photo.name} />
	)
}
const actions = {

	SEARCH_PHOTOS: 'SEARCH_PHOTOS',
	SEARCH_PHOTOS_SUCCESS: 'SEARCH_PHOTOS_SUCCESS',
	SEARCH_PHOTOS_ERROR: 'SEARCH_PHOTOS_ERROR',

	UPLOAD_FILES: 'UPLOAD_FILES',
	UPLOAD_FILE: 'UPLOAD_FILE',
	UPLOAD_FILE_PROGRESS: 'UPLOAD_FILE_PROGRESS',
	UPLOAD_FILE_SUCCESS: 'UPLOAD_FILE_SUCCESS',

	// --

	searchPhotos: () => ({
		type: actions.SEARCH_PHOTOS
	}),

	uploadFiles: (files, props) => ({
		type: actions.UPLOAD_FILES,
		payload: {files, props}
	})

	
}

export default actions
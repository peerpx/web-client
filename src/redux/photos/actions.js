const actions = {

	SEARCH_PHOTOS: 'SEARCH_PHOTOS',
	SEARCH_PHOTOS_SUCCESS: 'SEARCH_PHOTOS_SUCCESS',
	SEARCH_PHOTOS_ERROR: 'SEARCH_PHOTOS_ERROR',
	
	// --

	searchPhotos: () => ({
		type: actions.SEARCH_PHOTOS
	})
	
}

export default actions
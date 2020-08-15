import {
	CHANGE_SEARCH_FIELD,
	REQUEST_ROBOTS_PENDING,
	REQUEST_ROBOTS_SUCCESS,
	REQUEST_ROBOTS_FAILED,
	REQUEST_ROBOTS_SORT,
	REQUEST_ROBOTS_DELETE
} from './constants.js'


export const setSearchField = (text) => ({
	type: CHANGE_SEARCH_FIELD,
	payload: text
})

export const requestRobots = (url) => (dispatch) => {
	dispatch({ type: REQUEST_ROBOTS_PENDING });
	fetch(url)
		.then(response => response.json())
		.then(data => dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload:data }))
		.catch(error => dispatch({type: REQUEST_ROBOTS_FAILED, payload:error}))
}

export const sortRobots = (sorted) => ({
	type: REQUEST_ROBOTS_SORT,
	payload: sorted
})

export const deleteRobots = (deletedArray) => ({
	type: REQUEST_ROBOTS_DELETE,
	payload: deletedArray
})
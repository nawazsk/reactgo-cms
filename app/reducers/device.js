import * as types from '../types';

const device = (
	state = {},
	action
) => {
	switch(action.type) {
		case types.ADD_DEVICE_REQUEST:
			return action.device

		default :
			return state;
	}
}

const devices = (
	state = [],
	action
) => {
	switch(action.type) {
		case types.REQUEST_SUCCESS:
		case types.DEVICE_REQUEST_SUCCESS:
			if(action.data) return action.data;
			return state;

		case types.ADD_DEVICE_REQUEST:
			return [...state, device(undefined, action)];

		case types.ADD_DEVICE_FAILURE:
			return state.filter(t => t.id !== action.id);

		case types.BOOK_DEVICE_REQUEST:
			return [...state.filter(device => device.id !== action.payload.id), action.payload];

		case types.EDIT_DEVICE_REQUEST:
			return [...state.filter(device => device.id !== action.payload.id), action.payload];
		
		case types.EDIT_DEVICE_FAILURE:
			return [...state.filter(device => device.id !== action.id), action.data];

		case types.DELETE_DEVICE_REQUEST:
			return [...state.filter(device => device.id !== action.payload)];
		
		case types.DELETE_DEVICE_FAILURE:
			return [...state.filter(device => device.id !== action.id), action.data];

		case types.RELEASE_DEVICE_REQUEST:
			return [...state.filter(device => device.id != action.id), action.payload];

		default :
			return state;
	}
}

export default devices;
import md5 from 'spark-md5'; 
import * as types from '../types';
import { deviceService } from '../services';

function addDeviceRequest (data) {
	return {
		type: types.ADD_DEVICE_REQUEST,
		device: data
	} 
}

function addDeviceSuccess () {
	return {
		type: types.ADD_DEVICE_SUCCESS
	}
}

function addDeviceFailure (data) {
	return {
		type: types.ADD_DEVICE_FAILURE,
		id: data.id,
		error: data.error
	}
}

export function addDevice (deviceData) {
	return (dispatch, getState) => {
		const id = md5.hash(deviceData.name);
		console.log(`id: ${id}`);
		const data = {id, ...deviceData};

		dispatch(addDeviceRequest(data));

		return deviceService().addDeviceData({id, data})
			.then((res) => {
				if (res.status === 200) {
					return dispatch(addDeviceSuccess());
				}
			})
			.catch(() => {
				return dispatch(addDeviceFailure({ id, error:'Oops! Something went wrong and we couldn\'t add your device'}));
			});
	}
}
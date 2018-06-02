import {message} from "antd"

export const DisplayGenericError = function(msg){
	message.error(`${msg} 😮`, 5);
}

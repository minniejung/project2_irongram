//
const imageMaxSize = 2000000; //bytes
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif';
const acceptedFileTypesArray = acceptedFileTypes.split(",").map(function(item) {return item.trim()});
export const verifyFile = (files) =>{
	if( files && files.length > 0){
		const currentFile = files[0]
		const currentFileType = currentFile.type
		const currentFileSize = currentFile.size
		if(currentFileSize > imageMaxSize){
			alert("this file is not allowed"+ currentFileSize + "bytes is too large");
			return false;
		}
		if(!acceptedFileTypesArray.includes(currentFileType)){
		alert("this file is not allowed. Only image is allowed ")
		return false;
		}

		return true;
	}
}
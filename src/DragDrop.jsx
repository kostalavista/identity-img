import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';
import axios from "axios";

const Styles = styled.div`
.drag-drop {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 256px;
	height: 176px;
	border: 2px dashed #CACED0;
	border-radius: 4px;
	.drag-drop__title {
		font-weight: bold;
		font-size: 16px;
		line-height: 24px;
		color: #858E94;
		margin-bottom: 8px;
	}
	.drag-drop__or {
		font-size: 14px;
		line-height: 21px;
		color: #858E94;
		margin-bottom: 12px;
	}
}
`;

const DragDrop = () => {
	const sendFile = file => {
		const headers = {
			'authorization': 'Bearer ' + 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg0RkE4QzU4OUNBNDQxNEJCNEIzNzdGQkVBRkMzQUI1QkRDMUMzMUMiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJoUHFNV0p5a1FVdTBzM2Y3NnZ3NnRiM0J3eHcifQ.eyJuYmYiOjE1OTc2NjE1OTMsImV4cCI6MTU5Nzc0Nzk5MywiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5hemJpdC5jb20iLCJhdWQiOiJhcGkxIiwiY2xpZW50X2lkIjoiYXBpMSIsInN1YiI6IjkzOWFkNjBjLWVmYzgtNDA0Zi1hMzQ4LThjYmMzY2JiOWVmMiIsImF1dGhfdGltZSI6MTU5NzY2MTU5MywiaWRwIjoibG9jYWwiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiOTM5YWQ2MGMtZWZjOC00MDRmLWEzNDgtOGNiYzNjYmI5ZWYyIiwic2NvcGUiOlsib3BlbmlkIiwiYXBpMSJdLCJhbXIiOlsicHdkIl19.BaBaRBaQxzElXzRqmOW8EY96EfX0rg972dlfCo76LDLg4OrbmPfKyJ9ngk9HaqS1KEo2eK8tGHM_iOFyuKD5DMujAdT_70yqa-X2Jjs4H6tma5Oe9RJxUo1zXOJglE2PySlsDohqfqP4Ty06d3stYQDwaq4bYXLG7Y0HwHQQjFuzsYtCIpIWXNIcDBxZNBiolTEW4ZwkQxKZZNnnylcIZZe3OTHL_fgMj-uvJnkN2M9aAcnudlCdswbTk3AHP0n5REZvNjr-ULQ9SpwreMxOV-YiZeAsEtdFff61eXtl6VxVnRP8h5PFkf0KMy_mLMa05zgtD-FPwPfOpDnlJHJApw',
			'jsapi': 'true',
			'Content-Type': 'multipart/form-data'
		};

		var formData = new FormData();
		formData.append("file", file);
		
		const config = {
			method: 'post',
			url: 'https://identity.azbit.com/api/verification/identity-file',
			headers,
			data: formData,
		};

		return axios(config).then(({data}) => {
			console.log(data)
		}).catch(err => console.log(err));
	};

	const onDrop = useCallback((acceptedFiles) => {
		console.log("onDrop", acceptedFiles);
		sendFile(acceptedFiles[0]);

		// acceptedFiles.forEach((file) => {
		// 	const reader = new FileReader()
		//
		// 	reader.onabort = () => console.log('file reading was aborted')
		// 	reader.onerror = () => console.log('file reading has failed')
		// 	reader.onload = () => {
		// 		// Do whatever you want with the file contents
		// 		const binaryStr = reader.result;
		// 		console.log(binaryStr)
		// 		sendFile(binaryStr);
		// 	};
		// 	reader.readAsBinaryString(file)
		// })

	}, []);

	const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: 'image/*'});

	return (
		<Styles>
			<div className="drag-drop" {...getRootProps()}>
				<input {...getInputProps()} />
				<div className="drag-drop__title">Drag&Drop files here</div>
				<div className="drag-drop__or">or</div>
				<div>click here</div>
			</div>
		</Styles>
	)
};

export default DragDrop;
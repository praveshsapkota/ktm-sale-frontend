import React, { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import BackupOutlinedIcon from "@material-ui/icons/BackupOutlined";
import { Container, Thumb, ThumbsContainer } from "./Uploder.styles";
import { Controller } from "react-hook-form";

const thumbInner = {
	display: "flex",
	minWidth: 0,
	overflow: "hidden",
};

const img = {
	display: "block",
	width: "100px",
	height: "100%",
};

function Uploader({ onChange, imageURL, control, name }: any) {
	const [files, setFiles] = useState(
		imageURL ? [{ name: "demo", preview: imageURL }] : []
	);
	// const [imgfile, setimgfile] = useState([] as any);
	// // console.log(
	// // 	files.map((value) => {
	// // 		return value.name;
	// // 	})
	// // );

	const { getRootProps, getInputProps } = useDropzone({
		accept: "image/*",
		multiple: true,
		onDrop: useCallback(
			(acceptedFiles) => {
				// console.log(acceptedFiles);
				// acceptedFiles.map((file: any) => {
				// 	setimgfile((prevIteam: any) => [...prevIteam, file]);
				// });

				setFiles(
					acceptedFiles.map((file: any) =>
						// console.log(file);
						Object.assign(file, {
							preview: URL.createObjectURL(file),
						})
					)
				);
				onChange(acceptedFiles);
			},
			[onChange]
		),
	});

	const thumbs = files.map((file) => (
		<Thumb key={file.name}>
			<div style={thumbInner}>
				<img src={file.preview} style={img} alt={file.name} />
			</div>
		</Thumb>
	));

	useEffect(
		() => () => {
			// Make sure to revoke the data uris to avoid memory leaks
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		},
		[files]
	);

	return (
		<Controller
			control={control}
			name={name}
			// defaultValue={[]}
			render={({ field }) => (
				<>
					<section className="container uploader">
						<Container {...getRootProps()}>
							{/* {console.log(field.name)} */}
							<input
								{...getInputProps()}
								name={field.name}
								onBlur={field.onBlur}
							/>
							<BackupOutlinedIcon fontSize="large" />
							<div style={{ marginTop: "5px" }}>
								<span
									style={{
										color: "green",
										fontWeight: "bold",
										fontFamily: "monospace",
									}}
								>
									Drag/Upload
								</span>
								<span style={{ fontFamily: "monospace" }}>
									{" "}
									your image here.
								</span>
							</div>
						</Container>
						<ThumbsContainer>{thumbs}</ThumbsContainer>
					</section>
					{/* {...field} */}
				</>
			)}
		/>
	);
}

export default Uploader;

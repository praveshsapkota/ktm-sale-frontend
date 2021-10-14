/* eslint-disable @next/next/no-img-element */
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
	// console.log(imageURL);
	const sleep = (ms: any) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};
	const [files, setFiles] = useState(imageURL ? imageURL : []);

	const { getRootProps, getInputProps } = useDropzone({
		accept: "image/*",
		multiple: true,
		onDrop: useCallback(
			(acceptedFiles) => {
				setFiles(
					acceptedFiles.map((file: any) =>
						// console.log(file);
						URL.createObjectURL(file)
					)
				);
				onChange(acceptedFiles);
			},
			[onChange]
		),
	});

	const thumbs = files
		? files.map((name: any, index: any) => (
			<Thumb key={index}>
				{/* {console.log(name)} */}
				<div style={thumbInner}>
					<img src={name} style={img} alt={"images"} />
				</div>
			</Thumb>
		))
		: [];

	useEffect(
		() => () => {
			// Make sure to revoke the data uris to avoid memory leaks
			files.forEach((file: { preview: string }) => {
				// console.log(file);
				URL.revokeObjectURL(file.preview);
			});
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
									your Images here.
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

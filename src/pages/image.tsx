import React from "react";

interface props {}

const imgupl: React.FC<props> = () => {
	// const [img, setimg] = React.useState();
	const imgref = React.useRef();
	// console.log(imgref);
	const fileRef = React.useRef(null);
	const readFileWhenSubmit = (event) => {
		event.preventDefault();
		// get file using ref
		const uploadedFile = fileRef.current.files[0];
		console.log(uploadedFile);
		const fileReader = new FileReader();
		// Rest same as above
	};
	return (
		<div>
			<form
				onSubmit={(e) => {
					readFileWhenSubmit(e);
				}}
			>
				<input type="file" ref={fileRef} />
				<button>Display File Content</button>
			</form>
		</div>
	);
};

export default imgupl;

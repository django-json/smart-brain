import React from 'react';
import './FaceRecognition.css';

const FaceRecoginition = ({ imageURL, faceBox }) => {
	return (
		<div className="center ma">
			<div className="absolute mt2">
				<img id='face' alt='imagerecognition' src={ imageURL } width='500px' height='auto'/>
				<div className='box' style={{top: faceBox.top_row, left: faceBox.left_col, bottom: faceBox.bottom_row, right: faceBox.right_col}}></div>
			</div>
		</div>
	);
}

export default FaceRecoginition;
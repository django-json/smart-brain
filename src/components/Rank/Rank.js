import React from 'react';

const Rank = ({ name, entries }) => {
	return (
		<div className='white f3'>
			{`${name}, your current entries is ...`}
			<p className='f1 mt0'>#{ entries }</p>
		</div>
	);
}

export default Rank;
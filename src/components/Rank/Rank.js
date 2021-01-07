import React from 'react';

const Rank = ({ name, entries }) => {
	return (
		<div>
			<p className="white f3">{`${name}, your current entrie count is`}</p>
			<p className="white f2">{entries}</p>
		</div>
	);
};

export default Rank;

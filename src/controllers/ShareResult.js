import React from 'react';
import ShareResultComponent from '../components/ShareList/ShareResultComponent'
const styles = {
	about: {
		padding: '150px',
		textAlign: 'center',
		// backgroundColor: '#474e5d',
		color: 'black',
	}
};

export default class ShareResult extends React.Component {
	render() {
		return <div style={styles.about}>
			{/* <label>YAYAYAYAYA</label> */}
			<ShareResultComponent />

		</div>;
	}
}


import React from 'react';
import ShareItemComponent from '../components/ShareList/ShareItemComponent'
const styles = {
	about: {
		padding: '150px',
		textAlign: 'center',
		// backgroundColor: '#474e5d',
		color: 'black',
	}
};

export default class ShareItem extends React.Component {
	render() {
		return <div style={styles.about}>
			{/* <label>YAYAYAYAYA</label> */}
			<ShareItemComponent />

		</div>;
	}
}


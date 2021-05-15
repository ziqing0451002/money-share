import React from 'react';
import ShareListComponent from '../components/ShareList/ShareListComponent'
const styles = {
	about: {
		padding: '150px',
		textAlign: 'center',
		// backgroundColor: '#474e5d',
		color: 'black',
	}
};

export default class ShareList extends React.Component {
	render() {
		return <div style={styles.about}>
			{/* <label>YAYAYAYAYA</label> */}
			<ShareListComponent />

		</div>;
	}
}


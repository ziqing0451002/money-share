import React from 'react';
import AddShareItemComponent from '../components/ShareList/AddShareItemComponent'
const styles = {
	about: {
		padding: '150px',
		textAlign: 'center',
		// backgroundColor: '#474e5d',
		color: 'black',
	}
};

export default class AddShareItem extends React.Component {
	render() {
		return <div style={styles.about}>
			
			<AddShareItemComponent />

		</div>;
	}
}


import React from 'react';
import AddShareListComponent from '../components/ShareList/AddShareListComponent'
const styles = {
	about: {
		padding: '150px',
		textAlign: 'center',
		// backgroundColor: '#474e5d',
		color: 'black',
	}
};

export default class AddUser extends React.Component {
	render() {
		return <div style={styles.about}>
			
			<AddShareListComponent />

		</div>;
	}
}


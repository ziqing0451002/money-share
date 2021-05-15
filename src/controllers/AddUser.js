import React from 'react';
import UserCreateAccount from '../components/User/UserCreateAccount'
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
			
			<UserCreateAccount />

		</div>;
	}
}


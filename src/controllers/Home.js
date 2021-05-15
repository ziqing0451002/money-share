import React from 'react';
import UserLoginComponent from '../components/User/UserLoginComponent'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
const styles = {
	about: {
		padding: '150px',
		textAlign: 'center',
		// backgroundColor: '#474e5d',
		color: 'black',
	}
};

export default class Home extends React.Component {
	render() {
		return <div style={styles.about}>

			<button><Link to="./UserLogin">開始</Link></button>

		</div>;
	}
}


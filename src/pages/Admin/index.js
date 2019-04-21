import React, { Component } from 'react';
import api from '../../services/api';
import socket from 'socket.io-client';

import {MdFolder} from 'react-icons/md';
import date from 'date-fns';
import pt from 'date-fns/locale/pt';

import logo from '../../assets/logo.svg';
import './styles.css';

export default class Admin extends Component {

	state = {
		boxes: []
	};

	//Trago os registros dos boxes existentes
	async componentDidMount(){
		this.subscribeToNewFiles();
		this.handleData();
	}

	subscribeToNewFiles = () => {

		const io = socket('https://backendos.herokuapp.com');

		io.emit('ConnectAdmin', 123);
		io.on('createdBox', data => {
			//Se adiciona o objeto data no array boxes[]
			this.setState({ boxes: [ data, ...this.state.boxes ] });
		});
	};	

	handleData = async() => {
		const response = await api.get('/list');

		var joined = this.state.boxes.concat(response.data);
		this.setState({ boxes: joined })
	};

	render() {
	  return (
	  	<div id="box-container">
	  		<header>
	  			<img src={logo} alt="" />
	  			<h1>Real time das boxes</h1>
	  		</header>
	    	<ul>
	    		{	this.state.boxes &&
	    			this.state.boxes.map(item => (
			            <li key={item._id}>
			            	<a href={`https://frontendos.herokuapp.com/box/${item._id}`} rel="noopener noreferrer" target="_blank" className="fileInfo">
			            		<MdFolder size={24} color="#A5CFFF" />
			            		<strong>{item.title}</strong>
			            	</a>
			            	<span>
			            	{date.format((item.createdAt), 'DD/MM/YYYY, HH:mm')}
			    			</span>	
			            </li>
		        	))
		        }
	    	</ul>
	    </div>
	  );	
	}
	
}
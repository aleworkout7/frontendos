import React, { Component } from 'react';
import api from '../../services/api';
import socket from 'socket.io-client';


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
		//console.log("Conectado à sala <<ConnectAdmin>>")
		io.on('createdBox', data => {
			//console.log([data]);
			//console.log(data);
			//Debo agregar este objeto al arreglo boxes[]
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

	    	<ul>
	    		{	this.state.boxes &&
	    			this.state.boxes.map(item => (
		            <li key={item._id}>
		            	<a href={ process.env.URL? process.env.URL : `http://localhost:3000/box/${item._id}` } rel="noopener noreferrer" target="_blank">
		            		<strong>{item.title}</strong>
		            	</a>
		            </li>
		          ))}
	    	</ul>
	  );	
	}
	
}
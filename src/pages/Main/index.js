import React, { Component } from 'react';
import api from '../../services/api';
import socket from 'socket.io-client';


import './styles.css';
import logo from '../../assets/logo.svg';

export default class Main extends Component {

	state = {
		newBox: ""
	};

	handleSubmit = async e => {
		e.preventDefault();

		//envio o valor submetido pelo usuario à api
		const response = await api.post('boxes', {
			title: this.state.newBox,
		});

		//emito mensagem ao socket
		

		//navego à pagina boxes
		this.props.history.push(`/box/${response.data._id}`);
	};

	//Fico conversando com o state do componente, lhe falando o value do input
	handleInputChange = e => {
		this.setState({ newBox: e.target.value });
	};


	render() {
		return(
			<div id="main-container">
				<form onSubmit={this.handleSubmit}>
					<img src={logo} alt="" />
					<input 
						placeholder="Crie um box" 
						value={this.state.newBox}
						onChange={this.handleInputChange}
					/>
					<button type="submit">Criar</button>
				</form>
			</div>
		);
	}
}
import React, { Component } from 'react';
import api from '../../services/api';
import Dropzone from 'react-dropzone';
import socket from 'socket.io-client';

import {MdInsertDriveFile} from 'react-icons/md';
import date from 'date-fns';
import pt from 'date-fns/locale/pt';

import logo from '../../assets/logo.svg';
import './styles.css';

//1.Preciso trazer as informacoes da Api
//2.Logo preciso ficar ouvindo em tempo real

export default class Box extends Component {
	state = {
		newBox: {}
	};

	async componentDidMount() {
		this.subscribeToNewFiles();

		const box_id = this.props.match.params.id;
		const response = await api.get(`/boxes/${box_id}`);

		//atualizo o valor do statefull component
		this.setState({ newBox: response.data });
		//console.log(response.data);
	}

	subscribeToNewFiles = () => {
		const box_id = this.props.match.params.id;
		const io = socket('https://backendos.herokuapp.com');

		//envio a mensagem que o socket no backend espera ouvir
		io.emit('ConnectRoom', box_id);
		io.on('file', data => {
			//console.log(data);
			//crio um novo state do componente (inmutabiliade) 
			this.setState({ newBox : { ...this.state.newBox, files: [ data, ...this.state.newBox.files ] } });
		});
	};

	handleUpload = files => {
		files.forEach( file => {

			const data = new FormData();
			const box_id = this.props.match.params.id;
			

			data.append('file', file);

		
			api.post(`/boxes/${box_id}/files`, data);
		});
	};

	render() {
		//Preciso accesar à informacao contida na response, devo accesar ao state do Component
	  	return (
	    <div id="box-container">
	    	<header>
		    	<img src={logo} alt="" />
		    	<h1>{this.state.newBox.title}</h1>
	    	</header>

	    	<Dropzone onDropAccepted={this.handleUpload}>
	    		{ ({ getRootProps, getInputProps }) => (
	    		<div className="upload" {...getRootProps() }>
	    			<input {...getInputProps() } />

	    			<p>Clique ou arrastre aqui um arquivo</p>	
	    		</div>
	    		) }
	    	</Dropzone>

	    	<ul>
	    		{ this.state.newBox.files && this.state.newBox.files.map( file => ( 
	    		<li key={file._id}>
	    			<a href={file.url} target="_blank" rel="noopener noreferrer" className="fileInfo">
	    				<MdInsertDriveFile size={24} color="#A5CFFF" />
	    				<strong>{file.title}</strong>
	    			</a>
	    			<span>
	    			há { date.distanceInWordsToNow(file.createdAt, {
	    				locale: pt
	    			})}
	    			</span>
	    		</li>
				)) }
	    	</ul>
	    </div>
	    );
	}
		
}
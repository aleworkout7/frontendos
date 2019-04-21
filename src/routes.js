import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//importo as paginas
import Main from './pages/Main';
import Box from './pages/Box';
import Admin from './pages/Admin';

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" exact component={Main} />
			<Route path="/box/:id" component={Box} />
			<Route path="/admin" component={Admin} />
		</Switch>
	</BrowserRouter>
);

export default Routes;
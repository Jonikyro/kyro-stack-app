import {Route, Routes, Link, Outlet} from 'react-router-dom';
import './App.css'
import { Icon } from './components/icon';
import { hoi, registerUser } from './data/kissa-api';

function Home() {
	//useProfile();

	return (
		<div>
			<pre>{JSON.stringify({})}</pre>
			<Outlet />
		</div>
	);
}

function App() {
	//useProfile();

	// if (isLoading) return <h1>Tarkistetaan, että olethan autentikoitunut...</h1>

	return (
		<>
		<button onClick={registerUser}>Register</button>
		<button onClick={hoi}>hoi</button>
		<Icon icon='arrow' />
		<Routes>
			<Route index element={<Link to="home">Go to home</Link>} />
			<Route path="home" element={<Home />}>
			<Route
				path="messages"
				element={<Link to="../tasks">Messages -- Go to tasks</Link>}
			/>
			<Route path="tasks" element={<Link to="/home">Tasks -- Go to home</Link>} />
			</Route>
			<Route path="about" element={<div>About</div>} />
		</Routes>
		</>
	)
}

export default App

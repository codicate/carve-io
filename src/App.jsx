import s from './App.module.scss';
import Board from './components/Board';
import Control from './components/Control';

function App() {
	return (
		<div id={s.main}>
			<Board />
			<Control />
		</div>
	);
}

export default App;

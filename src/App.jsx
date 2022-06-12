import s from './App.module.scss';
import Board from './components/Board';
import Button from './components/Button';
import { GoMarkGithub } from 'react-icons/go';

function App() {
	return (
		<div id={s.main}>
			<Board />
			<Button
				styledAs="icon"
				id={s.github}
				onClick={() => {
					window.open('https://github.com/codicate/carve-io/', '_blank');
				}}
			>
				<GoMarkGithub />
			</Button>
		</div>
	);
}

export default App;

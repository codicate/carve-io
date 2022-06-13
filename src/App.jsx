import s from './App.module.scss';
import Game from './components/Game';
import Button from './components/Button';
import { AiFillQuestionCircle, AiOutlineGithub } from 'react-icons/ai';

function App() {
	return (
		<div id={s.main}>
			<Game />
			<div id={s.info}>
				<Button
					styledAs="icon"
					onClick={() => {
						window.open(
							'https://github.com/codicate/carve-io/blob/main/README.md#how-to-play',
							'_blank'
						);
					}}
				>
					<AiFillQuestionCircle />
				</Button>
				<Button
					styledAs="icon"
					onClick={() => {
						window.open('https://github.com/codicate/carve-io/', '_blank');
					}}
				>
					<AiOutlineGithub />
				</Button>
			</div>
		</div>
	);
}

export default App;

import s from './Counter.module.scss';
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi';
import Button from './Button';

const Counter = ({ numOfPlayers, setNumOfPlayers, startGame }) => {
	return (
		<div id={s.counterContainer}>
			<p>Number of Players?</p>
			<div id={s.counter}>
				<Button
					styledAs="icon"
					onClick={() => {
						if (numOfPlayers > 2) setNumOfPlayers(numOfPlayers - 1);
					}}
				>
					<FiMinusCircle />
				</Button>
				<p>{numOfPlayers}</p>
				<Button
					styledAs="icon"
					onClick={() => {
						if (numOfPlayers < 4) setNumOfPlayers(numOfPlayers + 1);
					}}
				>
					<FiPlusCircle />
				</Button>
			</div>

			<Button id={s.startBtn} onClick={startGame}>
				Start
			</Button>
		</div>
	);
};

export default Counter;

import s from './Control.module.scss';
import cn from 'classnames';
import { useState } from 'react';
import {
	FiPlusCircle,
	FiMinusCircle,
	FiArrowUpCircle,
	FiArrowDownCircle,
	FiArrowLeftCircle,
	FiArrowRightCircle,
} from 'react-icons/fi';
import Button from './Button';

const Control = ({ isMoving, spawn, move }) => {
	const [numOfPlayers, setNumOfPlayers] = useState(2);
	const [isStarted, setIsStarted] = useState(false);

	const startGame = () => {
		setIsStarted(true);
		spawn('red', 0, 0);
	};

	return (
		<div id={s.control}>
			<div id={s.controlContainer}>
				{isStarted ? (
					<div>
						{isMoving ? (
							<div>Moving...</div>
						) : (
							<>
								{' '}
								<Button onClick={() => move('red', 0, 1, 5)}>Move</Button>
							</>
						)}
					</div>
				) : (
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
				)}
			</div>

			<p id={s.title}>carve.io</p>
		</div>
	);
};

export default Control;

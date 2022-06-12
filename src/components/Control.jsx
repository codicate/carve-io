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
import dice from '../assets/dice';

const Control = ({ isMoving, spawn, move }) => {
	const [numOfPlayers, setNumOfPlayers] = useState(2);
	const [isStarted, setIsStarted] = useState(false);
	const [direction, setDirection] = useState({ x: 0, y: 0 });

	const startGame = () => {
		setIsStarted(true);
		spawn('red', 0, 0);
	};

	return (
		<div id={s.control}>
			<div id={s.controlContainer}>
				{isStarted ? (
					<>
						{isMoving ? (
							<div>Moving...</div>
						) : (
							<div id={s.moveControl}>
								<div id={s.dice}>
									<img src={dice.dice1} alt="" />
									<img src={dice.dice1} alt="" />
								</div>
								<div id={s.arrows}>
									<Button
										styledAs="icon"
										id={s.up}
										onClick={() => setDirection({ x: 0, y: -1 })}
									>
										<FiArrowUpCircle />
									</Button>
									<Button
										styledAs="icon"
										id={s.down}
										onClick={() => setDirection({ x: 0, y: 1 })}
									>
										<FiArrowDownCircle />
									</Button>
									<Button
										styledAs="icon"
										id={s.left}
										onClick={() => setDirection({ x: -1, y: 0 })}
									>
										<FiArrowLeftCircle />
									</Button>
									<Button
										styledAs="icon"
										id={s.right}
										onClick={() => setDirection({ x: 1, y: 0 })}
									>
										<FiArrowRightCircle />
									</Button>
								</div>
								<Button
									disabled={direction.x + direction.y === 0}
									onClick={() => move('red', direction.x, direction.y, 5)}
								>
									Move
								</Button>
							</div>
						)}
					</>
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

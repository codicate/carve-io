import s from './Control.module.scss';
import cn from 'classnames';
import { useState } from 'react';

const Control = () => {
	const [numOfPlayers, setNumOfPlayers] = useState(2);
	const startGame = () => {};

	return (
		<div id={s.control}>
			<p id={s.title}>carve.io</p>

			<p>Number of Players?</p>
			<div id={s.counterContainer}>
				<div id={s.counter}>
					<button
						onClick={() => {
							if (numOfPlayers > 2) setNumOfPlayers(numOfPlayers - 1);
						}}
					>
						Minus
					</button>
					<p>{numOfPlayers}</p>
					<button
						onClick={() => {
							if (numOfPlayers < 4) setNumOfPlayers(numOfPlayers + 1);
						}}
					>
						Add
					</button>
				</div>

				<button id={s.startBtn} onClick={startGame}>
					Start
				</button>
			</div>

			<div id={s.arrows}>
				<Arrow name="up" />
				<Arrow name="down" />
				<Arrow name="left" />
				<Arrow name="right" />
			</div>
		</div>
	);
};

export default Control;

const Arrow = ({ name }) => {
	return (
		<div>
			<i id={cn(s.ib, s[name])} />
		</div>
	);
};

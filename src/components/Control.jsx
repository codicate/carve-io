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

const Control = () => {
	const [numOfPlayers, setNumOfPlayers] = useState(2);
	const [isStarted, setIsStarted] = useState(false);
	const startGame = () => {
		setIsStarted(true);
	};

	return (
		<div id={s.control}>
			<p id={s.title}>carve.io</p>

			{isStarted ? (
				<div></div>
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

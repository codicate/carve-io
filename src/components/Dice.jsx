import s from './Dice.module.scss';
import dice from '../assets/dice';
import { useEffect, useState } from 'react';
import Button from './Button';

const Dice = ({ playerIndex, setSteps, gameState, setGameState }) => {
	const [correct, setCorrect] = useState(false);
	const [dice1, setDice1] = useState(1);
	const [dice2, setDice2] = useState(1);

	useEffect(() => {
		setDice1(1);
		setDice2(1);
		setCorrect(false);
	}, [playerIndex]);

	useEffect(() => {
		if (gameState === 'correct') setCorrect(true);
	}, [gameState]);

	const roll = () => {
		const n1 = Math.floor(Math.random() * 6) + 1;
		const n2 = Math.floor(Math.random() * 6) + 1;
		setDice1(n1);
		setDice2(n2);
		setSteps(correct ? n1 + n2 : n1);
		setGameState('rolled');
	};

	return (
		<div>
			<div id={s.dice}>
				<img src={dice[`dice${dice1}`]} alt="" />
				{correct && <img src={dice[`dice${dice2}`]} alt="" />}
			</div>
			<Button
				disabled={!['correct', 'incorrect'].includes(gameState)}
				onClick={roll}
			>
				Roll
			</Button>
		</div>
	);
};

export default Dice;

import s from './Dice.module.scss';
import dice from '../assets/dice';
import { useEffect, useState } from 'react';
import Button from './Button';

const Dice = ({ playerIndex, setSteps }) => {
	const [dice1, setDice1] = useState(1);
	const [dice2, setDice2] = useState(1);
	const [isRolled, setIsRolled] = useState(false);

	useEffect(() => {
		setDice1(1);
		setDice2(1);
		setIsRolled(false);
	}, [playerIndex]);

	useEffect(() => {
		setSteps(dice1 + dice2);
	}, [dice1, dice2, setSteps]);

	const roll = () => {
		setDice1(Math.floor(Math.random() * 6) + 1);
		setDice2(Math.floor(Math.random() * 6) + 1);
		setIsRolled(true);
	};

	return (
		<div>
			<div id={s.dice}>
				<img src={dice[`dice${dice1}`]} alt="" />
				<img src={dice[`dice${dice2}`]} alt="" />
			</div>
			<Button disabled={isRolled} onClick={roll}>
				Roll
			</Button>
		</div>
	);
};

export default Dice;

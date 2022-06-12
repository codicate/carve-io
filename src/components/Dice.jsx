import s from './Dice.module.scss';
import dice from '../assets/dice';

const Dice = ({ setSteps }) => {
	return (
		<div id={s.dice}>
			<img src={dice.dice1} alt="" />
			<img src={dice.dice1} alt="" />
		</div>
	);
};

export default Dice;

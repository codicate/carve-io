import s from './Arrows.module.scss';
import Button from './Button';
import {
	FiArrowUpCircle,
	FiArrowDownCircle,
	FiArrowLeftCircle,
	FiArrowRightCircle,
} from 'react-icons/fi';
import { useState, useEffect } from 'react';

const Arrows = ({ playerIndex, move, steps, gameState }) => {
	const [direction, setDirection] = useState({ x: 0, y: 0 });

	useEffect(() => {
		setDirection({ x: 0, y: 0 });
	}, [playerIndex]);

	return (
		<div>
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
				disabled={direction.x + direction.y === 0 || gameState !== 'rolled'}
				onClick={() => move(playerIndex, direction.x, direction.y, steps)}
			>
				Move
			</Button>
		</div>
	);
};

export default Arrows;

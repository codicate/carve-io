import s from './Board.module.scss';
import cn from 'classnames';
import _ from 'lodash';
import { useState } from 'react';
import Control from './Control';

const Board = () => {
	const [isMoving, setIsMoving] = useState(false);
	const [board, setBoard] = useState(initBoard(20));
	const [players, setPlayers] = useState([]);

	const spawn = (name, x, y) => {
		setPlayers((players) => players.concat({ name, x, y }));
		setBoard((board) => {
			let newBoard = _.cloneDeep(board);
			newBoard[x][y] = {
				state: 'occupied',
				owner: name,
			};
			return newBoard;
		});
	};

	const move = (name, direction, step) => {
		let i = 0;
		setIsMoving(true);
		const interval = setInterval(() => {
			const player = players.find((p) => p.name === name);
			setBoard((board) => {
				let newBoard = _.cloneDeep(board);
				newBoard[player.x][player.y] = {
					state: 'fenced',
					owner: player.name,
				};

				switch (direction) {
					case 'up':
						player.y -= 1;
						break;
					case 'down':
						player.y += 1;
						break;
					case 'left':
						player.x -= 1;
						break;
					case 'right':
						player.x += 1;
						break;
					default:
						break;
				}

				newBoard[player.x][player.y] = {
					state: 'occupied',
					owner: player.name,
				};

				console.log(newBoard);
				return newBoard;
			});
			i++;
			if (i === step) {
				setIsMoving(false);
				return clearInterval(interval);
			}
		}, 300);
	};

	return (
		<div id={s.main}>
			<div id={s.board}>
				{board.map((row, idx) => (
					<div className={s.row} key={idx}>
						{row.map((tile, idx) => (
							<Tile key={idx} tile={tile} />
						))}
					</div>
				))}
			</div>
			<Control {...{ isMoving, spawn, move }} />
		</div>
	);
};

export default Board;

const Tile = ({ idx, tile: { state, owner } }) => {
	return <div className={cn(s.tile, s[state], s[owner])} key={idx} />;
};

const initBoard = (size) => {
	let arr = [];

	for (let i = 0; i < size; i++) {
		let row = [];

		for (let j = 0; j < size; j++) {
			row[j] = {
				state: 'unclaimed', // unclaimed, claimed, occupied, fenced
				owner: '', // blue, red, yellow, green
			};
		}

		arr[i] = row;
	}

	return arr;
};

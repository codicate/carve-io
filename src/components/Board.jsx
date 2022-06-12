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
			newBoard[y][x] = {
				state: 'occupied',
				owner: name,
			};
			return newBoard;
		});
	};

	const stopMoving = (interval, pname, x, y) => {
		setIsMoving(false);
		setPlayers((players) => {
			let newPlayers = _.cloneDeep(players);
			newPlayers.find((p) => p.name === pname).x = x;
			newPlayers.find((p) => p.name === pname).y = y;
			return newPlayers;
		});
		clearInterval(interval);
	};

	const move = (pname, px, py, step) => {
		let i = 0;
		setIsMoving(true);
		let { name, x, y } = players.find((p) => p.name === pname);

		const interval = setInterval(() => {
			setBoard((board) => {
				let newBoard = _.cloneDeep(board);

				if (
					i === step ||
					(py === 0 && (x + px > board.length - 1 || x + px < 0)) ||
					(px === 0 && (y + py > board.length - 1 || y + py < 0))
				) {
					stopMoving(interval, pname, x, y);
				} else {
					newBoard[y][x] = {
						state: 'fenced',
						owner: name,
					};

					newBoard[y + py][x + px] = {
						state: 'occupied',
						owner: name,
					};

					x += px;
					y += py;
					i++;
				}

				return newBoard;
			});
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

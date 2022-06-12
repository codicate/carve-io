import s from './Game.module.scss';
import cn from 'classnames';
import _ from 'lodash';
import { useState } from 'react';

import Board from './Board';
import Button from './Button';
import Dice from './Dice';
import Arrows from './Arrows';
import Counter from './Counter';

const Game = () => {
	const playerColors = ['red', 'blue', 'yellow', 'green'];
	const [isStarted, setIsStarted] = useState(false);
	const [numOfPlayers, setNumOfPlayers] = useState(2);
	const [board, setBoard] = useState(initBoard(20));
	const [players, setPlayers] = useState([]);
	const [playerIndex, setPlayerIndex] = useState(0);
	const [isMoving, setIsMoving] = useState(false);
	const [direction, setDirection] = useState({ x: 0, y: 0 });
	const [steps, setSteps] = useState(0);

	const startGame = () => {
		setIsStarted(true);
		spawn('red', 0, 0);
	};

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
		setPlayerIndex((playerIndex + 1) % 4);
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
			<Board board={board} />
			<div id={s.control}>
				<div id={s.controlContainer}>
					{isStarted ? (
						<>
							{isMoving ? (
								<p id={s.status}>{playerColors[playerIndex]} is moving...</p>
							) : (
								<div id={s.moveControl}>
									<p id={s.status}>{playerColors[playerIndex]}'s move:</p>
									<Dice {...{ setSteps }} />
									<Arrows {...{ setDirection }} />
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
						<Counter {...{ numOfPlayers, setNumOfPlayers, startGame }} />
					)}
				</div>
				<p id={s.title}>carve.io</p>
			</div>
		</div>
	);
};

export default Game;

const initBoard = (size) => {
	let arr = [];

	for (let i = 0; i < size; i++) {
		let row = [];

		for (let j = 0; j < size; j++) {
			row[j] = {
				state: 'unclaimed', // unclaimed, claimed, occupied, fenced
				owner: '', // red, blue, yellow, green
			};
		}

		arr[i] = row;
	}

	return arr;
};

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
	const playerColors = ['red', 'blue', 'yellow', 'green', 'gray'];
	const [isStarted, setIsStarted] = useState(false);
	const [numOfPlayers, setNumOfPlayers] = useState(2);
	const [board, setBoard] = useState(initBoard(20));
	const [players, setPlayers] = useState([]);
	const [playerIndex, setPlayerIndex] = useState(0);
	const [isMoving, setIsMoving] = useState(false);
	const [steps, setSteps] = useState(0);

	const startGame = () => {
		setIsStarted(true);
		spawn(0, 0, 0);
		spawn(1, 0, board.length - 1);
		if (numOfPlayers > 2) spawn(3, board.length - 1, 0);
		if (numOfPlayers > 3) spawn(2, board.length - 1, board.length - 1);
	};

	const spawn = (index, x, y) => {
		setPlayers((players) => players.concat({ index, x, y }));
		setBoard((board) => {
			let newBoard = _.cloneDeep(board);
			newBoard[y][x] = {
				state: 'occupied',
				owner: index,
			};
			return newBoard;
		});
	};

	const updatePlayer = (index, x, y) => {
		setPlayers((players) => {
			let newPlayers = _.cloneDeep(players);
			newPlayers.find((p) => p.index === index).x = x;
			newPlayers.find((p) => p.index === index).y = y;
			return newPlayers;
		});
	};

	const cleanBoard = (newBoard, index, states) => {
		for (let i = 0; i < board.length; i++) {
			for (let j = 0; j < board.length; j++) {
				if (
					newBoard[i][j].owner === index &&
					states.includes(newBoard[i][j].state)
				) {
					newBoard[i][j].state = 'unclaimed';
					newBoard[i][j].owner = 5;
				}
			}
		}
	};

	const claimArea = (newBoard) => {};

	const stopMoving = (interval, index, x, y) => {
		setIsMoving(false);
		setPlayerIndex((playerIndex + 1) % numOfPlayers);
		updatePlayer(index, x, y);
		clearInterval(interval);
	};

	const move = (pIndex, px, py, step) => {
		let i = 0;
		setIsMoving(true);
		let { index, x, y } = players.find((p) => p.index === pIndex);

		const interval = setInterval(() => {
			setBoard((board) => {
				let newBoard = _.cloneDeep(board);

				if (
					i === step ||
					(py === 0 && (x + px > board.length - 1 || x + px < 0)) ||
					(px === 0 && (y + py > board.length - 1 || y + py < 0))
				) {
					stopMoving(interval, index, x, y);
				} else {
					newBoard[y][x] = {
						state: 'fenced',
						owner: index,
					};
					const nextTile = newBoard[y + py][x + px];

					if (nextTile.state === 'occupied') {
						newBoard[board.length - 1][board.length - 1] = {
							state: 'occupied',
							owner: nextTile.owner,
						};

						updatePlayer(nextTile.owner, board.length - 1, board.length - 1);
						cleanBoard(newBoard, nextTile.owner, ['claimed', 'fenced']);
					}

					if (nextTile.state === 'fenced' && nextTile.owner !== playerIndex)
						cleanBoard(newBoard, nextTile.owner, ['fenced']);

					if (
						nextTile.owner === playerIndex &&
						['claimed', 'fenced'].includes(nextTile.state)
					)
						claimArea(newBoard);

					newBoard[y + py][x + px] = {
						state: 'occupied',
						owner: index,
					};

					x += px;
					y += py;
					i++;
				}

				return newBoard;
			});
		}, 100);
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
									<Dice {...{ playerIndex, setSteps }} />
									<Arrows {...{ playerIndex, move, steps }} />
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
				owner: 5, // red, blue, yellow, green
			};
		}

		arr[i] = row;
	}

	return arr;
};

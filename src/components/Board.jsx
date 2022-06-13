import s from './Board.module.scss';
import cn from 'classnames';

const playerColors = ['red', 'blue', 'yellow', 'green', 'gray'];

const Board = ({ board }) => {
	return (
		<div id={s.board}>
			{board.map((row, idx) => (
				<div className={s.row} key={idx}>
					{row.map((tile, idx) => (
						<Tile key={idx} tile={tile} />
					))}
				</div>
			))}
		</div>
	);
};

export default Board;

const Tile = ({ idx, tile: { state, owner } }) => {
	return (
		<div className={cn(s.tile, s[state], s[playerColors[owner]])} key={idx} />
	);
};

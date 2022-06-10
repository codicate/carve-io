import s from './Board.module.scss';
import cn from 'classnames';
import useStore from '../hooks/useStore';

const Board = () => {
	const board = useStore((state) => state.board);
	const spawn = useStore((state) => state.spawn);
	spawn('red', 0, 0);

	return (
		<div id={s.board}>
			{board.map((row, idx) => (
				<div className={s.row} key={idx}>
					{console.log(row)}
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
	return <div className={cn(s.tile, s[state], s[owner])} key={idx} />;
};

const isTileFenced = (board, owner, r, c) => {
	return (
		['occupied', 'fenced'].includes(board[r][c].state) &&
		board[r][c].owner === owner
	);
};

const findVertex = (board, playerIndex, r, c, x, y) => {
	if (isTileFenced(board, playerIndex, r + x, c + y))
		return findVertex(board, playerIndex, r + x, c + y, x, y);
	else return [r, c];
};

const claimArea = (board, owner) => {
	const vertices = [];

	for (let r = 0; r < board.length; r++) {
		for (let c = 0; c < board[r].length; c++) {
			if (isTileFenced(board, owner, r, c)) {
				const startingVertex = [r, c];
				vertices.push(startingVertex);
				const newVertex = findVertex(board, owner, r, c, 1, 0);
			}
		}
	}
};

export default claimArea;

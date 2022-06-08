import create from 'zustand';

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

const useStore = create((set) => ({
	board: initBoard(20),
	spawn: (playerName, x, y) =>
		set((state) => {
			state.board[x][y] = {
				state: 'occupied',
				owner: playerName,
			};
		}),
	move: () => set((state) => {}),
}));

export default useStore;

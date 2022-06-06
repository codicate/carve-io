export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

export const getRandNumBetween = (min, max) => {
	return Math.floor(Math.random() * (max - min) + min);
};

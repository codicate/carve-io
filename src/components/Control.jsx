import s from './Control.module.scss';
import cn from 'classnames';

const Control = () => {
	return (
		<div id={s.arrowControl}>
			<Arrow name="up" />
			<Arrow name="down" />
			<Arrow name="left" />
			<Arrow name="right" />
		</div>
	);
};

export default Control;

const Arrow = ({ name }) => {
	return (
		<div>
			<i id={cn(s.ib, s[name])} />
		</div>
	);
};

import styles from './Button.module.scss';
import cn from 'classnames';

function Button({ children, type = 'button', styledAs, className, ...props }) {
	return (
		<button
			className={cn(
				styles.btn,
				styledAs ? styles[styledAs] : styles.default,
				className
			)}
			type={type}
			{...props}
		>
			{children}
		</button>
	);
}

export default Button;

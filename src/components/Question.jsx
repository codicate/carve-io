import s from './Question.module.scss';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import questions from '../assets/questions';
import Button from './Button';

const Question = ({ index, gameState, setGameState }) => {
	const letters = ['A', 'B', 'C', 'D'];
	const [answer, setAnswer] = useState(-1);

	useEffect(() => {
		if (gameState === 'question') {
			setAnswer(-1);
		}
	}, [gameState]);

	const checkQuestion = () => {
		const isCorrect = questions[index].correctAnswer === answer;
		setGameState(isCorrect ? 'correct' : 'incorrect');
		console.log(index);
	};

	return (
		<div>
			<div id={s.question}>
				<p>{questions[index].question}</p>
				<div id={s.choices}>
					{questions[index].choices.map((choice, i) => (
						<div key={i}>
							<Button
								styledAs="radio"
								className={cn({
									[s.selected]: answer === i,
									[s.incorrect]: gameState !== 'question',
									[s.correct]:
										gameState !== 'question' &&
										questions[index].correctAnswer === i,
								})}
								onClick={() => setAnswer(i)}
							>
								{letters[i]}. {choice}
							</Button>
						</div>
					))}
				</div>
			</div>
			<Button
				onClick={checkQuestion}
				disabled={answer === -1 || gameState !== 'question'}
			>
				Check
			</Button>
		</div>
	);
};

export default Question;

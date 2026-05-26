import ReactDOMServer from 'react-dom/server';
import { useState, useMemo } from 'react';
import parse from 'html-react-parser';

// Quiz component with custom styling
export default function QuizComponent({ className, children }) {
    const [disabled, setDisabled] = useState(false);
    const [result, setResult] = useState(null); // 'correct', 'incorrect', or null
    const [checkedItems, setCheckedItems] = useState({});

    const componentUniqueId = useMemo(() =>
        Math.random().toString(36).substring(2, 15), []
    );

    // Parse quiz options from children
    let lis = children.props.children.map((child, index) => {
        if (typeof child === 'string') return null;
        const flattened = ReactDOMServer.renderToString(child);
        const li = flattened.replace('<li data-reactroot="">', '').slice(0, -5);
        const isCorrect = li.endsWith('*');
        return {
            index,
            correct: isCorrect,
            li: parse(isCorrect ? li.slice(0, -1) : li)
        };
    }).filter(li => li !== null);

    const isQuiz = lis.some(li => li.correct);
    if (!isQuiz) return <ul>{children}</ul>;

    const handleCheck = (index) => {
        if (disabled) return;
        setCheckedItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
        // Reset result on new selection
        if (result === 'incorrect') setResult(null);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const checkedIndexes = Object.entries(checkedItems)
            .filter(([_, checked]) => checked)
            .map(([idx]) => parseInt(idx));
        const correctIndexes = lis.filter(li => li.correct).map(li => li.index);

        const isCorrect = checkedIndexes.length === correctIndexes.length &&
            checkedIndexes.every(idx => correctIndexes.includes(idx));

        if (isCorrect) {
            setResult('correct');
            setDisabled(true);
        } else {
            setResult('incorrect');
        }
    };

    return (
        <div
            id={componentUniqueId}
            className={`quiz ${result ? `quiz--${result}` : ''}`}
        >
            <div className="quiz-header">
                <span className="quiz-icon">?</span>
                <span className="quiz-title">Check Your Understanding</span>
            </div>

            <form onSubmit={onSubmit} className="quiz-form">
                <div className="quiz-options">
                    {lis.map(li => (
                        <label
                            key={li.index}
                            className={`quiz-option ${checkedItems[li.index] ? 'quiz-option--checked' : ''} ${disabled ? 'quiz-option--disabled' : ''}`}
                        >
                            <input
                                type="checkbox"
                                checked={checkedItems[li.index] || false}
                                onChange={() => handleCheck(li.index)}
                                disabled={disabled}
                                className="quiz-input"
                            />
                            <span className="quiz-checkbox">
                                <svg viewBox="0 0 24 24" className="quiz-checkmark">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </span>
                            <span className="quiz-label">{li.li}</span>
                        </label>
                    ))}
                </div>

                {!disabled && (
                    <button type="submit" className="quiz-submit">
                        <span>Check Answer</span>
                        <svg viewBox="0 0 24 24" className="quiz-submit-icon">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </button>
                )}
            </form>

            {result === 'correct' && (
                <div className="quiz-result quiz-result--correct">
                    <svg viewBox="0 0 24 24" className="quiz-result-icon">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="16 9 10.5 14.5 8 12"/>
                    </svg>
                    <span>Correct! Well done.</span>
                </div>
            )}

            {result === 'incorrect' && (
                <div className="quiz-result quiz-result--incorrect">
                    <svg viewBox="0 0 24 24" className="quiz-result-icon">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="15" y1="9" x2="9" y2="15"/>
                        <line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                    <span>Not quite. Try again!</span>
                </div>
            )}
        </div>
    );
}
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

// evaluate quiz questions
export default function QuizComponent({ className, children }) {


    const [disabled, setDisabled] = useState(false);
    const [correct, setCorrect] = useState(false);

    // list of <li> nodes inside a single <ul>; build labels directly from React children
    const listRoot = Array.isArray(children) ? children[0] : children;
    const listItemsRaw = listRoot?.props?.children;
    const listItems = Array.isArray(listItemsRaw) ? listItemsRaw : (listItemsRaw != null ? [listItemsRaw] : []);

    const getText = (node) => {
        if (node == null) return '';
        if (typeof node === 'string') return node;
        if (Array.isArray(node)) return node.map(getText).join('');
        if (node.props && node.props.children !== undefined) return getText(node.props.children);
        return '';
    };

    const lis = listItems
        .map((child, index) => {
            if (!child || child.type !== 'li') return null;
            const rawText = getText(child.props?.children || '').replace(/\r\n?/g, '\n');
            let text = rawText;
            let correct = false;
            // Determine correctness by trailing '*', ignoring trailing whitespace
            const m = /(.*?)(\s*\*)\s*$/.exec(text);
            if (m) {
                correct = true;
                text = m[1];
            }
            const label = text.trimEnd();
            return { index, correct, li: label };
        })
        .filter(Boolean);

    const componentUniqueId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    const onSubmit = (e) => {
        e.preventDefault();
        // which checkboxes are checked 
        const checked = Array.from(e.target.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
        const checkedToInt = checked.map(checked => parseInt(checked));
        const correctLIindexes = lis.filter(li => li.correct).map(li => li.index);
        const CorrectLIstoInt = correctLIindexes.map(correctLIindex => parseInt(correctLIindex));
        // check if correct
        const correct = checkedToInt.every(checked => CorrectLIstoInt.includes(checked)) && checkedToInt.length === correctLIindexes.length;


        if (correct) {
            // change componentUniqueId color to green 
            const component = document.getElementById(componentUniqueId);
            component.style.backgroundColor = 'rgba(0, 170, 100, 0.3)';
            const submitButton = document.getElementById(`${componentUniqueId}-submit`);
            // remove button 
            submitButton.remove();
            // make checkboxes unclickable 
            setDisabled(true);
            setCorrect(correct);
        } else {
            // change componentUniqueId color to red
            const component = document.getElementById(componentUniqueId);
            component.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
            // make the submit button say 'Incorrect!' and disable it
            const submitButton = document.getElementById(`${componentUniqueId}-submit`);
            submitButton.innerHTML = 'Try again!';
        }
    };

    // if at least one item is correct, it's a quiz
    const isQuiz = lis?.some(li => li.correct);
    if (!isQuiz) {
        return (<ul>{children}</ul>);
    }

    return (
        <div id={componentUniqueId} className='quiz'>
            <form onSubmit={onSubmit} className="quiz-form">
                <FormControl component="fieldset">
                    <FormLabel component="legend" className="quiz-label">Quiz</FormLabel>
                    {lis.map(li => (
                        <FormControlLabel
                            key={li.index}
                            value={String(li.index)}
                            control={<Checkbox className="quiz-checkbox" />}
                            label={li.li}
                            className="quiz-option"
                            disabled={disabled}
                        />
                    ))}
                </FormControl>
                <Button type="submit" className='quiz-submit' id={`${componentUniqueId}-submit`}>
                    Check my answer
                </Button>
            </form>
            {correct && <p className="quiz-result">Correct!</p>}
        </div>
    );
}

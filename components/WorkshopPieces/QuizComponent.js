import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

// evaluate quiz questions
export default function QuizComponent({ className, children }) {


    const [disabled, setDisabled] = useState(false);
    const [correct, setCorrect] = useState(0);

    // list of <li> nodes inside a single <ul>; build labels directly from React children
    const listRoot = Array.isArray(children) ? children[0] : children;
    const listItemsRaw = listRoot?.props?.children;
    const listItems = Array.isArray(listItemsRaw) ? listItemsRaw : (listItemsRaw != null ? [listItemsRaw] : []);
    const lis = listItems
        .map((child, index) => {
            if (!child || child.type !== 'li') return null;
            let labelChildren = child.props?.children;
            const parts = Array.isArray(labelChildren) ? [...labelChildren] : [labelChildren];
            // Determine correctness by trailing '*' on the last stringy segment, then remove it from label
            let correct = false;
            for (let i = parts.length - 1; i >= 0; i--) {
                const seg = parts[i];
                if (typeof seg === 'string') {
                    const trimmed = seg.trimEnd();
                    if (trimmed.endsWith('*')) {
                        correct = true;
                        // remove only the final '*' while preserving preceding text/spacing
                        const lastStar = seg.lastIndexOf('*');
                        parts[i] = seg.slice(0, lastStar);
                    }
                    break;
                }
                if (seg != null) break; // non-string node at end; stop scanning
            }
            const label = <>{parts}</>;
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
            <form
                onSubmit={onSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                }}
            >
                <FormControl component="fieldset">
                    <FormLabel component="legend">Quiz</FormLabel>
                    {lis.map(li => (
                        <FormControlLabel
                            key={li.index}
                            value={li.index}
                            control={<Checkbox />}
                            label={li.li}
                            className={`${componentUniqueId}-checkbox`}
                            disabled={disabled}
                            style={{
                                // no bullet 
                                listStyleType: 'none',
                            }}
                        />

                    ))}
                </FormControl>
                <Button type="submit" className='button button-bark'
                    id={`${componentUniqueId}-submit`}>
                    Check my answer
                </Button>
            </form>
            {correct ? <p>Correct!</p> : <p></p>}
        </div>
    );
}

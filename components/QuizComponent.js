import ReactDOMServer from 'react-dom/server';
import { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import parse from 'html-react-parser';

// evaluate quiz questions
export default function QuizComponent({ className, children }) {


    const [disabled, setDisabled] = useState(false);
    const [correct, setCorrect] = useState(0);

    // list of lis in children 
    const lis = children[0].props.children.map((child, index) => {
        const flattened = ReactDOMServer.renderToString(child);
        // remove <li data-reactroot="">
        // strip last 5 characters '</li>'
        const li = flattened.replace('<li data-reactroot="">', '').slice(0, -5);
        // correct if ends with *</li>
        const correct = li.endsWith('*');
        // strip *
        if (correct) {
            const liStripped = li.slice(0, -1);
            return {
                index,
                correct,
                li: parse(liStripped)
            };
        }
        return {
            index,
            correct,
            li: parse(li)
        }
    })
    
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
    const isQuiz = lis.some(li => li.correct);
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
                        />

                    ))}
                </FormControl>
                <Button type="submit" variant="contained" color="primary" className='quizButton'
                    id={`${componentUniqueId}-submit`}>
                    Check my answer
                </Button>
            </form>
            {correct ? <p>Correct!</p> : <p></p>}
        </div>
    );
}


// component that hides text until the user clicks a button to reveal it. This is useful for hiding spoilers or other information that the user may not want to see right away.

import React from 'react';
import { Button } from '@mui/material/';
import { ArrowDropDown } from '@mui/material/';


export default function HiddenText(props) {
  const [show, setShow] = React.useState(false);

  const text = props.children[0]


  return (
    <div>
      {show ? text : null}
      <Button
        variant="contained"
        color="primary"
        className='secretButton'
        endIcon={<ArrowDropDown />}
        onClick={() => setShow(!show)}
      >
        {show ? 'Hide' : 'Show'}
      </Button>
    </div>
  );
}
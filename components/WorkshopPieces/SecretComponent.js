import React, { useState } from 'react';
import { Button } from '@mui/material/';
import { ArrowDropDown } from '@mui/material/';

export default function SecretComponent(props) {
  const [show, setShow] = useState(false);
  const children = props.text;
  console.log(children);

  return (
    <div className="secret">
      <Button
        onClick={() => {
          setShow(!show);
        }
        }
        style={{
          color: "#32c259",
          fontWeight: "bold",
          fontSize: "16px",
          textTransform: "none",
          padding: "0px"
        }}
      >
        {!show && 'Reveal'}
        {show && 'Hide'}
      </Button>
      {show && <div className="secret-content">
        {children}
      </div>}
    </div>
  )
}

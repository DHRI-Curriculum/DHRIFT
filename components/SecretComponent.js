import React from 'react';
import { Button } from '@mui/material/';
import { ArrowDropDown } from '@mui/material/';


export default function SecretComponent(props) {
  const [show, setShow] = React.useState(false);
  const children = props.text;

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
        {children[0]}
      </div>}
    </div>

  )
}


//   return (
//     <div className="secret">
//       <Button
//         onClick={() => {
//           setShow(!show);
//         }
//         }
//         style={{
//           color: "#32c259",
//           fontWeight: "bold",
//           fontSize: "16px",
//           textTransform: "none",
//           padding: "0px"
//         }}
//       >
//         {text}
//         <ArrowDropDown
//           style={{
//             fontSize: "20px"
//           }}
//         />
//       </Button>
//       {show && <div className="secret-content">
//         {/* {props.children.slice(1)} */}
//         hello
//       </div>}
//     </div>
//   )
// }

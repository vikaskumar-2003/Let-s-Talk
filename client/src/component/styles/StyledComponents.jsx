import { styled } from "@mui/material/styles";
import { Link as LinkComponent } from "react-router-dom";
import { grayColor } from "../../Constant/color";

export const VisuallyHidden=styled("input")({

    border:0,
    clip:"rect(0 0 0 0)",
   height:1, 
     margin:-1,
     overflow:"hidden",
     padding:0,
     position:"absolute",
     whiteSpace:"nowrap",
     width:1,
})


export const Link=styled(LinkComponent)`
  color:black
  textdecoration:none
  padding:1rem;
  &:hover{
    backgroumd-color:rgba(102, 97, 97, 0.1)
  }
`

export const InputBox = styled("input")`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 3rem;
  border-radius: 1.5rem;
  background-color: ${grayColor};
`;
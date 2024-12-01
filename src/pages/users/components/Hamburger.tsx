import React from "react";
import styled from "styled-components";

const Burger = styled.button<propsStyled>`
position: absolute;
top: 40px;
transform: translateY(-50%);
left: 2rem;
display: none;
flex-direction: column;
justify-content: space-around;
width: 2rem;
height: 2rem;
background: transparent;
border: none;
cursor: pointer;
padding: 0;
z-index: 100;
  &:focus {
    outline: none;
  }
  @media (max-width:768px){
    display:flex
  }
  div {
    width: 2rem;
    height: 0.1rem;
    background: white;
    border:1px  black;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
  
  :first-child {
    transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
  }

  :nth-child(2) {
    opacity: ${({ open }) => open ? '0' : '1'};
    transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
  }

  :nth-child(3) {
    transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
  }
}
`;

interface props {
    open: Boolean,
    setOpen: Function,
}
interface propsStyled{
    open:Boolean,
    onClick: Function
}
export const Hamburger = ({open, setOpen} : props) =>{

  const handleOpen=()=>{
   setOpen(!open)
   document.querySelector('body')?.classList.toggle('body_mobile');
  }
    return(
        <Burger open={open} onClick={handleOpen}>
            <div></div>
            <div></div>
            <div></div>
        </Burger>
    )
    
}

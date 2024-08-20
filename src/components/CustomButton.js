import React, { useRef } from 'react';
import '../css/CustomButton.css';

function CustomButton({ name ,  onClick=()=>null , ...rest }) {
  const buttonRef = useRef(null);
  const rippleRef = useRef(null);

  function handleClick(event) {
    const button = buttonRef.current;
    const ripple = rippleRef.current;
    const buttonRect = button.getBoundingClientRect();
    const { left, top } = buttonRect;
    const leftPosition = event.clientX - left;
    const topPosition = event.clientY - top;

    ripple.style.left = leftPosition + 'px';
    ripple.style.top = topPosition + 'px';

    ripple.classList.add('active');

    setTimeout(() => {
      ripple.classList.remove('active');
    }, 600);
    onClick()
  }

  return (
    <div ref={buttonRef} onClick={handleClick} {...rest} className="myButton">
      {name}
      <span ref={rippleRef} className="rippleEffect"></span>
    </div>
  );
}

export default CustomButton;
import {ReactNode} from 'react';
import "../../../field.css";

interface AuthFieldProps {
  children: ReactNode;
}

const GridFiled = ({children}: AuthFieldProps) => {
  return (
      <div className='gridCart'>
        <div className='gridCartFilter'>{children}</div>
      </div>
  );
};

export default GridFiled;

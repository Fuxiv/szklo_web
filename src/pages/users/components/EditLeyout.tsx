import {ReactNode} from 'react';
import "../../../field.css";

interface AuthFieldProps {
  children: ReactNode;
}

const EditLeyout = ({children}: AuthFieldProps) => {
  return (
      <div className='editLeyout'>
        <div className='gridCartFilterEdit'>{children}</div>
      </div>
  );
};

export default EditLeyout;

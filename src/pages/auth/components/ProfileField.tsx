import {ReactNode} from 'react';
import styled from 'styled-components';


const ProfileField = ({children}:{children:any}) => {
  return (
      <div className='authCartProfile'>
        <div className='authCartFilterProfile'>{children}</div>
      </div>
  );
};

export default ProfileField;

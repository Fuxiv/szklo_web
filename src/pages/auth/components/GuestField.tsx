import {ReactNode} from 'react';
import styled from 'styled-components';

const AuthOverlaySlice = styled.div`
  position: relative;
  z-index: 2;
  /* max-width: 100vw; */
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AuthCard = styled.div`
  max-height: 100%;
  /* height: 560px; */
  min-width: 500px;
  /* max-width: calc(100% - 20px); */
  background: linear-gradient(
    180deg,
    rgba(78, 119, 224, 0.5) 0%,
    rgba(94, 204, 255, 0.5) 33.65%,
    rgba(94, 192, 255, 0.5) 65.42%,
    rgba(86, 110, 231, 0.5) 100%
  );
  border-radius: 5px;
  /* padding: 20; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  backdrop-filter: blur(12px);
`;

const AuthCartFilter = styled.div`
  max-height: 100%;
  /* height: 560px; */
  min-width: 500px;
  /* max-width: calc(100% - 20px); */
  backdrop-filter: blur(12px) opacity(0);
  border-radius: 25px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(115, 35, 153, 0.1) 33.65%,
    rgba(30, 30, 30, 0.1) 65.42%,
    rgba(0, 0, 0, 0.1) 100%
  );
  
  padding-top: 32px;
  padding-bottom: 32px;
`;

interface AuthFieldProps {
  children: ReactNode;
}

const GuestField = ({children}: AuthFieldProps) => {
  return (
    <div className='authOverlaySlice'>
      <div className='authCard'>
        <div className='authCartFilter'>{children}</div>
      </div>
    </div>
  );
};

export default GuestField;

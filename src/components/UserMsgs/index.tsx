import React, { FC } from 'react';
import WarningIcon from '../../assets/svg/warning.svg';
import './style.scss';

type UserMsgsProps = {
  msg: string;
  show: boolean;
};

const UserMsgs: FC<UserMsgsProps> = (props: UserMsgsProps) => {
  const { msg, show } = props;
  return show ? (
    <div className='user-msg'>
      <img src={WarningIcon} alt='Warning' />
      <p>{msg}</p>
    </div>
  ) : null;
};

export default UserMsgs;

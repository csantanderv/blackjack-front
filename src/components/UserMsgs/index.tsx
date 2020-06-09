import React, { FC } from 'react';

type UserMsgsProps = {
  msg: string;
  show: boolean;
};

const UserMsgs: FC<UserMsgsProps> = (props: UserMsgsProps) => {
  const { msg, show } = props;
  return show ? (
    <div className='user-msg'>
      <p>{msg}</p>
    </div>
  ) : null;
};

export default UserMsgs;

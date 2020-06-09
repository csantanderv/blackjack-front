import { useState, useEffect } from 'react';

const useShowMsg = (): [boolean, string, Function] => {
  const [showMsg, setShowMsg] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (msg !== '') {
      setShowMsg(true);
    } else {
      setShowMsg(false);
    }
  }, [msg]);

  const setUserMsg = (msg: string) => {
    setMsg(msg);
  };

  return [showMsg, msg, setUserMsg];
};

export default useShowMsg;

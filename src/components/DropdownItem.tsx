import React, { FC, ReactNode } from 'react';
import '../index.scss';

type DropdownItemProps = {
  goToMenu?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode | string;
  onClick(goTo: string): void;
};

const DropdownItem: FC<DropdownItemProps> = (props) => {
  const setActiveMenu = (goTo: string) => {
    props.onClick(goTo);
  };
  return (
    <a
      href='#/'
      className='menu-item'
      onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
    >
      <span className='icon-button'>{props.leftIcon}</span>
      {props.children}
      <span className='icon-right'>{props.rightIcon}</span>
    </a>
  );
};

export default DropdownItem;

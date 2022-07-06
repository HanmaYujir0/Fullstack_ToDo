import React from 'react';
import style from './header.module.css'

const Header = () => {
  return (
    <header>
    <div className={style.Todo_header}>
      Список дел
    </div>
    <hr/>
    </header>
  );
};

export default Header;
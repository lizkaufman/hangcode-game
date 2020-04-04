import React from 'react';
import css from './message.module.css';

function Message({ message }) {
  return <p className={css.message}>{message}</p>;
}
export default Message;

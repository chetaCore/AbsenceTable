import React from 'react';
import { useState } from 'react';
import { IRemoteComponentContext, IRemoteComponentCoverApi } from '@directum/sungero-remote-component-types';
import './control.css';

interface IProps {
  // Заполни интерфейс по передаваемым параметрам.
}

// Сформировать страницу.
const ControlInfo: React.FC<IProps> = ({ }) => {
  // Напиши здесь получение данных.

  return (
    <div className="App">
      Сформируй HTML-страницу для отображения.
    </div>
  )
};

export default ControlInfo;




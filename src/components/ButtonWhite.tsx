import React from 'react';
import './ButtonWhite.scss';

export default function ButtonWhite (props: { caption: string, onClick?: (e:React.MouseEvent<HTMLButtonElement>) => void}) {
    return <button className="ButtonWhite" onClick={ props.onClick }>{ props.caption }</button>
}
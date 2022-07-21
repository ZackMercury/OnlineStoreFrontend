import React, { useEffect, useRef } from "react";
import './DropdownButton.scss';

export default function DropdownButton (props: { id: number, caption: string, options: string[], onSelect: (id:number, selected: number) => void}) {

    const { id, caption, options, onSelect } = props;

    useEffect(() => {
        // Component did update
    });
    
    return <>
        <span className="linkLike dropdownHost">
            <span className="dropdown">
                { options ? options.map((option, i) => <>
                    <span key={"span" + i} id={i.toString()} className="dropdownOption" onClick={(e) => onSelect(id, parseInt(e.currentTarget.id)) }>
                        <span key={"span" + i} className="optionText">{option}</span>
                    </span>
                    <hr/>
                </>) : <></>}
            </span>
            <span className="dropdownTrigger">{caption}</span>
        </span>
        
    </>
}
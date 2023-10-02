import { useState, useEffect } from 'react';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

export default function DoDropdown({ items, label, id, onSelection }){
    const [ dropdownItems, setDropdownItems ] = useState([]);

    useEffect(() => {
        function setDropdownItemsState(){
            setDropdownItems(items)
        }
        setDropdownItemsState(items);
       

    },[items]);

    return (
        <>
            <Dropdown id={id}  style={{ marginBottom: "0.5rem" }}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                { label }
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {
                    dropdownItems.length > 0 && dropdownItems.map((item) => {
                            return <Dropdown.Item  key={item.title}href={'#'} onClick={() => onSelection({"title": item.title,"link": item.link})}>{ item.title }</Dropdown.Item>
                        })
                    }                
                </Dropdown.Menu>
            </Dropdown>
        </>

    );
}
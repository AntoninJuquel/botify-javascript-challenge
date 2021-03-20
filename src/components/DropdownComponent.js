import React, { useState } from 'react'
import { Dropdown, FormControl } from 'react-bootstrap'

export default function DropdownComponent({ title, placeholder, items, onSelectItem }) {
    const [value, setValue] = useState("")
    const DropdownItems = () => {
        const itemKeys = Object.keys(items)
        return (
            items ? itemKeys.filter(key => key.includes(value)).map((key, i) =>
                <Dropdown.Item key={i} active={items[key]} onClick={() => onSelectItem(key)}>
                    {key}
                </Dropdown.Item>
            ) : null
        )
    }
    return (
        <Dropdown>
            <Dropdown.Toggle>
                {title}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <FormControl
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder={placeholder}
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <DropdownItems />
            </Dropdown.Menu>
        </Dropdown>
    )
}

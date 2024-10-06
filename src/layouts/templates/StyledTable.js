import { Padding, Style } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { position } from 'stylis';

// Stil tablosu komponenti
const StyledTable = ({ selectedElement, onStyleChange }) => {
    const [styles, setStyles] = useState({});
    const [attributes, setAttributes] = useState({});

    useEffect(() => {
        if (selectedElement) {
            const computedStyles = window.getComputedStyle(selectedElement);
            const styleObj = {
                backgroundColor: computedStyles.backgroundColor,
                width: computedStyles.width,
                height: computedStyles.height,
                left: computedStyles.left,
                top: computedStyles.top,
                textAlign: computedStyles.textAlign,
                color: computedStyles.color,
                margin: computedStyles.margin,
                padding: computedStyles.padding,
                position: computedStyles.position,
                display: computedStyles.display,
                border: computedStyles.border
            };
            const attrs = selectedElement.attributes;
            const attrObj = {};
            for (let i = 0; i < attrs.length; i++) {
                attrObj[attrs[i].name] = attrs[i].value;
            }
            setAttributes(attrObj);
            setStyles(styleObj);
        }
    }, [selectedElement]);
    const handleAttributeChange = (name, value) => {
        setAttributes((prev) => ({ ...prev, [name]: value }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedStyles = { ...styles, [name]: value };
        setStyles(updatedStyles);
        onStyleChange(name, value);
    };
    return (
        <div style={{ fontSize: '10pt',textAlign:'left' }}>
            <table>
                <caption><h2>Properties</h2></caption>
                <tbody>
                    <tr>
                        <td colSpan={2}>
                            <h4>Styles</h4>
                        </td>
                    </tr>
                    <tr>
                        <th>Property</th>
                        <th>Value</th>
                    </tr>
                    {Object.keys(styles).map((style) => (
                        <tr key={style}>
                            <td>{style}</td>
                            <td>
                                <input
                                    type="text"
                                    name={style}
                                    value={styles[style]}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={2}>
                            <h4>Attributes</h4>
                        </td>
                    </tr>
                    <tr>
                        <th>Property</th>
                        <th>Value</th>
                    </tr>
                    {Object.entries(attributes).map(([key, value]) => (
                        <tr key={key}>
                            <td>{key}</td>
                            <td>
                                <input
                                    type="text"
                                    value={value}
                                    onChange={(e) => handleAttributeChange(key, e.target.value)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
};
export default StyledTable;
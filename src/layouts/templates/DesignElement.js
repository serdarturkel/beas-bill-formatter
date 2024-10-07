import { useRef, useState } from "react";
import { Rnd } from "react-rnd";
import Editor from "./components/Editor";
import { Button, Icon } from "@mui/material";

const DesignComponent = ({ deleteEvent, setSelectedElement, id }) => {
    const handleElementClick = (e) => {
        setSelectedElement(e.target);
    };
    const handleDeleteEvent = (e) => {
        deleteEvent(id);
    };

    const [size, setSize] = useState({ width: 200, height: 200 });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const rndRef = useRef(null)
    return (<Rnd
        ref={rndRef}
        size={{ width: size.width, height: size.height }}
        position={{ x: position.x, y: position.y }}
        onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
        onResize={(e, direction, ref, delta, position) => {
            setSize({
                width: ref.style.width,
                height: ref.style.height,
            });
            setPosition(position);
        }}
        minWidth={10}
        minHeight={10}
    >
        <Icon onClick={handleDeleteEvent} fontSize="small" color="inherit" className="doNotPrint" style={{
            position: 'absolute',
            left: '-25px',
            top: '-1px',
            cursor: 'pointer',
            border: 'solid 1px #ccaaff',
            borderRadius: '3px',
            backgroundColor:'#ffaacc5c',
            padding: 0,
            margin: 0,
            width: '24px',
            height: '24px',
            zIndex: 1000,
        }}>
            delete
        </Icon>


        {<Editor className="content-box" onClick={handleElementClick} id={id} />}
    </Rnd>)
};

export default DesignComponent;

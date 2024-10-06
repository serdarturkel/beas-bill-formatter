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
        <Button onClick={handleDeleteEvent} className='primary' style={{
            position: 'absolute',
            bottom: '0px',
            right: '0px',
            cursor: 'pointer',
            zIndex: 1000,
        }}>
            <Icon fontSize="small" color="inherit">
                delete
            </Icon>
        </Button>

        {<Editor className="content-box" onClick={handleElementClick} id={id} />}
    </Rnd>)
};

export default DesignComponent;

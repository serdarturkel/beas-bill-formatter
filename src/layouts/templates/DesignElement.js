import { useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import Editor from "./components/Editor";
import { Button, Icon } from "@mui/material";
import { ResizableBox } from "react-resizable";
import Draggable from "react-draggable";

const DesignComponent = ({ deleteEvent, setSelectedElement, id }) => {
    const handleElementClick = (e) => {
        setSelectedElement(e.target);
    };
    const handleDeleteEvent = (e) => {
        deleteEvent(id);
    };

    
    const rndRef = useRef(null)
    const contentRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 150, height: 60 });
    const [isResizing, setIsResizing] = useState(false); // Resizable durumu kontrolü
    useEffect(() => {
        if (contentRef.current) {
            const { scrollHeight, scrollWidth } = contentRef.current;
            setDimensions({
                width: Math.max(scrollWidth + 20, 200), // Min width 200
                height: Math.max(scrollHeight + 20, 200), // Min height 200
            });
        }
    }, [contentRef]);
    return (
        <Draggable ref={rndRef}
            handle=".drag-handle" // Sadece taşıma ikonu üzerinden taşımayı aktif et
            disabled={isResizing}  // Boyutlandırma sırasında taşıma özelliğini devre dışı bırak
        >
            <ResizableBox
                width={dimensions.width}
                height={dimensions.height}
                resizeHandles={["se", "e", "s"]}
                minConstraints={[10, 10]} // Min boyutlar
                maxConstraints={[1920, 1080]} // Max boyutlar
                onResizeStart={() => setIsResizing(true)} // Boyutlandırma başlıyor
                onResizeStop={() => setIsResizing(false)} // Boyutlandırma bitiyor
            >
                <div
                    style={{
                        position: "relative",
                        border: "1px solid black",
                        padding: "10px",
                        height: "100%",
                        width: "100%",
                        boxSizing: "border-box",
                    }}
                >
                    <Icon fontSize="small" color="inherit" color="info"
                        className="drag-handle"
                        style={{
                            position: "absolute",
                            top: -28,
                            left: 0,
                            cursor: "move",
                            backgroundColor: "white",
                            border: 'solid 1px lightgray',
                            borderRadius: '3px',
                            width: "24px",
                            height: "24px",
                        }}>
                        drag_handle
                    </Icon>
                    <Icon onClick={handleDeleteEvent} fontSize="small" color="inherit" color="info"
                        className="drag-handle"
                        style={{
                            position: "absolute",
                            top: -28,
                            left: 28,
                            cursor: "pointer",
                            backgroundColor: "white",
                            border: 'solid 1px lightgray',
                            borderRadius: '3px',
                            width: "24px",
                            height: "24px",
                        }}>
                        delete
                    </Icon>
                    {<Editor onClick={handleElementClick} id={id} ref={contentRef} />}
                </div>
            </ResizableBox>
        </Draggable>
    )
};

export default DesignComponent;

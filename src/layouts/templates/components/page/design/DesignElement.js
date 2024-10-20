import React, { useEffect, useRef, useState } from "react";
import Editor from "../../editor/Editor";
import { Icon } from "@mui/material";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import '../style/General.css';

const DesignComponent = React.forwardRef(({ id, deleteEvent, selectEvent, originEvent, content, position, initialDimension }, ref) => {
    const draggableRef = useRef();
    const resizableRef = useRef();

    const contentRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 150, height: 60 });
    const [isResizing, setIsResizing] = useState(false);
    const type = "design";

    React.useImperativeHandle(ref, () => ({
        getContent: () => {
            return contentRef.current.getContent();
        },
        setContent: (data) => {
            contentRef.current.setContent(data);
        },
        getId: () => {
            return id;
        },
        getType: () => {
            return type;
        },
        getPosition: () => {
            const { x, y } = draggableRef.current.state;
            return { x, y };
        },
        getDimension: () => {
            const { width, height } = resizableRef.current.state;
            return { width, height };
        }
    }));

    const handleElementClick = (e) => {
        selectEvent(e.target);
        originEvent(id);
    };

    const handleDeleteEvent = (e) => {
        deleteEvent(id);
    };


    /*
    useEffect(() => {
        if (contentRef.current) {
            const { scrollHeight, scrollWidth } = contentRef.current;
            setDimensions({
                width: Math.max(scrollWidth + 20, dimensions.width),
                height: Math.max(scrollHeight + 20, dimensions.height),
            });
        }
    }, [contentRef, ref]);
    */

    useEffect(() => {
        if (content) {
            console.log("Default Content:" + JSON.stringify(content));
            contentRef.current.setContent(content);
        }
        if (initialDimension) {
            setDimensions({
                width: initialDimension.width,
                height: initialDimension.height
            });
        }
    }, [contentRef, ref]);

    return (
        <Draggable ref={draggableRef}
            handle=".drag-handle" // Sadece taşıma ikonu üzerinden taşımayı aktif et
            disabled={isResizing}  // Boyutlandırma sırasında taşıma özelliğini devre dışı bırak
            bounds="parent"
            defaultPosition={position}
        >
            <ResizableBox
                ref={resizableRef}
                width={dimensions.width}
                height={dimensions.height}
                resizeHandles={["se", "e", "s"]}
                minConstraints={[10, 10]}
                maxConstraints={[1920, 1080]}
                onResizeStart={() => setIsResizing(true)}
                onResizeStop={() => setIsResizing(false)}
            >
                <div className="draggableContent" id={id + "-design"}>
                    <Icon fontSize="small" color="inherit"
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
                    <Icon onClick={handleDeleteEvent} fontSize="small" color="inherit"
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
                    {<Editor onClick={handleElementClick} id={id} ref={contentRef} data={content} />}
                </div>
            </ResizableBox>
        </Draggable>
    )
});

export default DesignComponent;

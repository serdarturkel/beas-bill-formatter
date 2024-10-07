import { Icon } from "@mui/material";
import React, { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css"; // Resizable için gerekli CSS

const DraggableResizableDiv = () => {
    const [isResizing, setIsResizing] = useState(false); // Resizable durumu kontrolü

    return (
        <Draggable
            handle=".drag-handle" // Sadece taşıma ikonu üzerinden taşımayı aktif et
            disabled={isResizing}  // Boyutlandırma sırasında taşıma özelliğini devre dışı bırak
        >
            <ResizableBox
                width={200}
                height={200}
                minConstraints={[100, 100]} // Min boyutlar
                maxConstraints={[500, 500]} // Max boyutlar
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
                    <div
                        className="drag-handle"
                        style={{
                            position: "absolute",
                            top: -28,
                            left: 0,
                            cursor: "move",
                            backgroundColor: "white",
                            border:'solid 1px lightgray',
                            borderRadius:'3px',
                            width: "24px",
                            height: "24px",
                        }}
                    >
                        <Icon fontSize="small" color="inherit" color="info">
                            drag_handle
                        </Icon>
                    </div>
                    {/* İçerik */}
                    <p>Taşınabilir ve boyutlandırılabilir bir div.</p>
                </div>
            </ResizableBox>
        </Draggable>
    );
};

export default DraggableResizableDiv;

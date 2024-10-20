import React, { useEffect, useRef, useState } from 'react';
import { Button, Icon } from '@mui/material';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import '../style/General.css';
const ImageUpload = React.forwardRef(({ id, content, deleteEvent, selectEvent, originEvent, position }, ref) => {
    const type = "image";
    const [imageData, setImageData] = useState(null);
    const rndRef = useRef(null);
    const contentRef = useRef(null);
    const [imageDimension, setDimensions] = useState({ width: 150, height: 60 });
    const [isResizing, setIsResizing] = useState(false); // Resizable durumu kontrolü

    React.useImperativeHandle(ref, () => ({
        getContent: () => {
            return { image: imageData };
        },
        setContent: (data) => {
            setImageData(data);
        },
        getId: () => {
            return id;
        },
        getType: () => {
            return type;
        },
        getBoundingClientRect: () => {
            const { x, y } = rndRef.current.state;
            return { x, y };
        }
    }));

    const handleDeleteEvent = (e) => {
        deleteEvent(id);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageData(reader.result);
            };
            reader.readAsDataURL(file); // Binary olarak veriyi okuyoruz
        }
    };
    const handleElementClick = (e) => {
        selectEvent(e.target);
        originEvent(id);
    };
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    useEffect(() => {
        if (contentRef.current) {
            const { scrollHeight, scrollWidth } = contentRef.current;
            setDimensions({
                width: Math.max(scrollWidth + 20, 200), // Min width 200
                height: Math.max(scrollHeight + 20, 200), // Min height 200
            });
            ref.current = {
                getContent() {
                    return imageData;
                },
                setContent(data) {
                    setImageData(data);
                }
            };
        }
        if (content)
            setImageData(content);
    }, [imageData]);
    return (
        <Draggable ref={rndRef}
            handle=".drag-handle"
            disabled={isResizing}
            bounds="parent"
            defaultPosition={position}
        >
            <ResizableBox
                width={imageDimension.width}
                height={imageDimension.height}
                resizeHandles={["se", "e", "s"]}
                minConstraints={[10, 10]} // Min boyutlar
                maxConstraints={[1920, 1080]} // Max boyutlar
                onResizeStart={() => setIsResizing(true)} // Boyutlandırma başlıyor
                onResizeStop={() => setIsResizing(false)} // Boyutlandırma bitiyor
            >
                <div className='draggableContent' id={id + "-image"}>
                    <Icon fontSize="small"
                        color={"info"}
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
                    <Icon onClick={handleDeleteEvent} fontSize="small"
                        color={"info"}
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
                    {!imageData && (
                        <Button
                            className='center-in-box'
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            color='white'
                        >
                            <Icon fontSize="small">
                                uploadFile
                            </Icon>
                            <VisuallyHiddenInput
                                type="file"
                                onChange={handleFileChange}
                                multiple
                            />
                        </Button>
                    )}
                    {imageData && (
                        <img id={id} onClick={handleElementClick} src={imageData} alt="Selected" className='centered-img' />
                    )}
                </div>
            </ResizableBox>
        </Draggable>
    )
});

export default ImageUpload;

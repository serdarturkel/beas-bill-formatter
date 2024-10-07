import { width } from '@mui/system';
import React, { useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import ImageUploadCss from './ImageUpload.css';
import { Button, Icon } from '@mui/material';
import styled from 'styled-components';

const ImageUpload = ({ deleteEvent, setSelectedElement, id }) => {
    const handleDeleteEvent = (e) => {
        deleteEvent(id);
    };
    const [imageData, setImageData] = useState(null);
    const rndRef = useRef(null);
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

    const [size, setSize] = useState({ width: 200, height: 200 });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    return (
        <div>
            <Rnd
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
                enableUserSelectHack={false}
            >
                <Icon onClick={handleDeleteEvent} className='doNotPrint' fontSize="small" color="inherit" style={{
                    position: 'absolute',
                    left: '-25px',
                    top: '-1px',
                    cursor: 'pointer',
                    border: 'solid 1px #ccaaff',
                    borderRadius: '3px',
                    backgroundColor: '#ffaacc5c',
                    padding: 0,
                    margin: 0,
                    width: '24px',
                    height: '24px',
                    zIndex: 1000,
                }}>
                    delete
                </Icon>
                {!imageData && (
                    <Button
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
                    <img id={id} ref={setSelectedElement} src={imageData} alt="Selected" className='centered-img' />
                )}
            </Rnd>
        </div>
    );
};

export default ImageUpload;

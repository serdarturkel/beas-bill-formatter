
import Draggable from 'react-draggable';
import styles from "./A4Page.css";
import Editor from "./components/Editor";
import { Icon } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { ResizableBox } from 'react-resizable';
import { Rnd } from 'react-rnd';

const A4Page = React.forwardRef((props, ref) => {
    const [bounds, setBounds] = useState({ left: 0, top: 0, right: 0, bottom: 0 });

    useEffect(() => {
        if (ref.current) {
            const container = ref.current;
            setBounds({
                left: 0,
                top: 0,
                right: container.clientWidth,
                bottom: container.clientHeight,
            });
        }
    }, []);

    const [size, setSize] = useState({ width: 200, height: 200 });
    const [position, setPosition] = useState({ x: 0, y: 0 });


    return (
        <div class="page" page-size="A4" layout="portrait">
            <div id='pageContent' class="page-content" ref={ref}>

                <Rnd
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
                    <Editor className="content-box" />
                </Rnd>
            </div>
        </div>
    )
});

export default A4Page;
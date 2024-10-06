
import Draggable from 'react-draggable';
import styles from "./A4Page.css";
import Editor from "./components/Editor";
import { Icon, Grid, Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { ResizableBox } from 'react-resizable';
import { Rnd } from 'react-rnd';
import MDButton from 'components/MDButton';
import StyledTable from './StyledTable';
import DesignComponent from './DesignElement';
import { useReactToPrint } from 'react-to-print';

const A4Page = React.forwardRef((props) => {
    const [bounds, setBounds] = useState({ left: 0, top: 0, right: 0, bottom: 0 });

    useEffect(() => {
        if (componentRef.current) {
            const container = componentRef.current;
            setBounds({
                left: 0,
                top: 0,
                right: container.clientWidth,
                bottom: container.clientHeight,
            });
        }
    }, []);



    const [selectedElement, setSelectedElement] = useState(null);

    const handleStyleChange = (property, value) => {
        if (selectedElement) {
            selectedElement.style[property] = value;
        }
    };

    const [components, setComponents] = useState([]);
    const addComponent = () => {
        const newId = `component-${Math.floor(Math.random() * 10000)}`;
        setComponents([...components, newId]);
    };

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        contentRef: componentRef
    });
    const print = (event) => {
        const printElement = componentRef.current;
        if (printElement) {
            // Geçici bir DOM elementine çevir
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = printElement.outerHTML;

            // Silmek istediğin öğeyi seç (örneğin, bir düğme)
            const item1 = tempDiv.querySelectorAll('.codex-editor-overlay');
            item1.forEach((item) => {
                item.remove(); // Seçilen düğümü DOM'dan sil
            });
            const item2 = tempDiv.querySelectorAll('.ce-inline-toolbar');
            item2.forEach((item) => {
                item.remove(); // Seçilen düğümü DOM'dan sil
            });
            const item3 = tempDiv.querySelectorAll('.ce-toolbar');
            item3.forEach((item) => {
                item.remove(); // Seçilen düğümü DOM'dan sil
            });

            // Kalan HTML'i tekrar outerHTML olarak al
            console.log(tempDiv.innerHTML);

            console.log();
        }
        handlePrint(event);
    };
    return (
        <div>
            <Grid container justifyContent="center" spacing={1}>
                <Grid item xs={12} md={3}>
                    <div class="page-container">
                        {selectedElement && (
                            <StyledTable selectedElement={selectedElement} onStyleChange={handleStyleChange} />
                        )}
                    </div>
                </Grid>
                <Grid item xs={12} md={9} spacing={1}>
                    <div class="page-container" style={{ textAlign: 'left' }}>
                        <Button className='primary' onClick={addComponent}>
                            <Icon fontSize="small" color="inherit">
                                add
                            </Icon>
                            Add New
                        </Button>
                        <Button className='primary' onClick={print}>
                            <Icon fontSize="small" color="inherit">
                                print
                            </Icon>
                            Print
                        </Button>
                    </div>
                    <div class="page-container">
                        <div class="page" page-size="A4" layout="portrait">
                            <div id='pageContent' class="page-content" ref={componentRef}>
                                {components.map((id) => (
                                    <DesignComponent key={id} id={id} setSelectedElement={setSelectedElement} />
                                ))}
                            </div>
                        </div>
                    </div>
                </Grid>

            </Grid>
        </div>
    )
});

export default A4Page;
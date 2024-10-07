
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
import ImageUpload from './ImageUpload';
import DraggableResizableDiv from './DraggableResizableDiv';

const A4Page = React.forwardRef(() => {
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


    const [selectedComponent, setSelectedComponent] = useState(null);

    const [selectedElement, setSelectedElement] = useState(null);


    const handleStyleChange = (property, value) => {
        if (selectedElement) {
            selectedElement.style[property] = value;
        }
    };

    const [components, setComponents] = useState([]);
    const addComponent = (type) => {
        const newId = {
            type: type,
            id: `component-${Math.floor(Math.random() * 10000)}`
        };
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
        }
        handlePrint(event);
    };
    const deleteItem = (compId) => {
        console.log("Delete Event Id:" + compId);
        const updatedItems = components.filter((item) => item.id != compId);
        setComponents(updatedItems);
    }
    const addDesignComponent = () => {
        addComponent('design');
    };
    const addImageComponent = () => {
        addComponent('image');
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
                    <div class="page-container">
                        <Button className='primary' onClick={addDesignComponent}>
                            <Icon fontSize="small" color="inherit">
                                design_services
                            </Icon>
                            Add Design
                        </Button>

                        <Button className='primary' onClick={addImageComponent}>
                            <Icon fontSize="small" color="inherit">
                                image
                            </Icon>
                            Add Image
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
                                {
                                    components.map((comp) => {
                                        if (comp.type == 'design') {
                                            return (<DesignComponent deleteEvent={deleteItem} key={comp.id} id={comp.id} setSelectedElement={setSelectedElement} />);
                                        }
                                        if (comp.type == 'image') {
                                            return (<ImageUpload deleteEvent={deleteItem} key={comp.id} id={comp.id} setSelectedElement={setSelectedElement} />);
                                        }
                                        return (<span>comp not defined</span>);
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </Grid>

            </Grid>
        </div>
    )
});

export default A4Page;
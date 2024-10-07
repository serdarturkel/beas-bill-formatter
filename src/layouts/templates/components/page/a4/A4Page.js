
import "./A4Page.css";
import "react-resizable/css/styles.css"; 

import { Icon, Grid, Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import StyledTable from '../styledTable/StyledTable';
import DesignComponent from '../design/DesignElement';
import { useReactToPrint } from 'react-to-print';
import ImageUpload from '../image/ImageUpload';


const A4Page = React.forwardRef(() => {
    const [selectedOrigin, setSelectedOrigin] = useState(null);
    const [selectedElement, setSelectedElement] = useState(null);
    const [components, setComponents] = useState([]);
    const componentRef = useRef();
    const handlePrint = useReactToPrint({ contentRef: componentRef });

    const changeZIndex = (clickedId) => {
        setComponents(prevComponents => prevComponents.map(comp => ({ ...comp, zIndex: comp.id === clickedId ? 1 : 0 })));
    };

    useEffect(() => {
        changeZIndex(selectedOrigin);
    }, [selectedOrigin]);

    const handleStyleChange = (property, value) => {
        if (selectedElement) {
            selectedElement.style[property] = value;
        }
    };


    const addComponent = (type) => {
        const newId = {
            type: type,
            id: `component-${Math.floor(Math.random() * 10000)}`,
            zIndex: 1000
        };
        setComponents([...components, newId]);
    };

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
        const updatedItems = components.filter((item) => item.id !== compId);
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
                                        const style = { zIndex: comp.zIndex };
                                        if (comp.type === 'design') {
                                            return (<DesignComponent style={style} deleteEvent={deleteItem} key={comp.id} id={comp.id} setSelectedElement={setSelectedElement} setSelectedOrigin={setSelectedOrigin} />);
                                        }
                                        if (comp.type === 'image') {
                                            return (<ImageUpload style={style} deleteEvent={deleteItem} key={comp.id} id={comp.id} setSelectedElement={setSelectedElement} setSelectedOrigin={setSelectedOrigin} />);
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
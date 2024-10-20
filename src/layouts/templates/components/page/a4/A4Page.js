
import "./A4Page.css";
import "react-resizable/css/styles.css";

import { Icon, Button, Skeleton, Avatar, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import DesignComponent from '../design/DesignElement';
import { useReactToPrint } from 'react-to-print';
import ImageUpload from '../image/ImageUpload';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getData, postData, patchData } from "api/api";
import Notification from "components/Notification";
import MDSnackbarOptions from "components/MDSnackbar/options";

const A4Page = React.forwardRef(({ selectEvent }) => {
    const [selectedOrigin, originEvent] = useState();
    const navigate = useNavigate();

    const [components, setComponents] = useState([]);
    const componentRefs = useRef([]);

    const pageContentRef = useRef();
    const handlePrint = useReactToPrint({ contentRef: pageContentRef });
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const notificationElement = useRef();

    const [templateName, setTemplateName] = useState('');

    const changeZIndex = (clickedId) => {
        setComponents(prevComponents => prevComponents.map(comp => ({ ...comp, zIndex: comp.id === clickedId ? 1 : 0 })));
    };

    useEffect(() => {
        changeZIndex(selectedOrigin);
    }, [selectedOrigin]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const result = await getData("/invoiceTemplate/read/" + id);
            setTemplateName(result.templateName);
            setData(result);
            recreateComponenet(result);
        } catch (e) {
            console.log(e);
            setData(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [id]);



    const addComponent = (id, type, content, position, dimension) => {
        const dynamicRef = React.createRef();
        const newComp = {
            type: type,
            id: id,
            zIndex: components.length,
            content: content,
            dynamicRef: dynamicRef,
            position: position,
            dimension: dimension
        };

        setComponents(prevComponents => [...prevComponents, newComp]);
        componentRefs.current = [...componentRefs.current, dynamicRef];
    };

    const recreateComponenet = (data) => {
        if (data.designData) {
            setComponents([]);
            const designDataList = JSON.parse(data.designData);
            designDataList.forEach((designData) => {
                const storedElement = JSON.parse(designData);
                addComponent(storedElement.id, storedElement.type, storedElement.content, storedElement.position, storedElement.dimension);
            });
        }
    }
    const backToThePage = async (item) => {
        navigate('/invoiceTemplates');
      };
    const print = (event) => {
        const printElement = pageContentRef.current;
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
    const deleteEvent = (compId) => {
        const updatedItems = components.filter((item) => item.id !== compId);
        setComponents(updatedItems);
    }
    const addDesignComponent = () => {
        addComponent(`beas-comp-${Math.floor(Math.random() * 10000)}`, 'design', null, { x: 0, y: 0 }, { width: 150, height: 60 });
    };
    const addImageComponent = () => {
        addComponent(`beas-comp-${Math.floor(Math.random() * 10000)}`, 'image', null, { x: 0, y: 0 }, { width: 150, height: 60 });
    };
    const savePage = () => {
        let contents = [];
        componentRefs.current.forEach((compRef) => {
            if (compRef && compRef.current) {
                const designDataObject = {
                    content: compRef.current.getContent(),
                    position: compRef.current.getPosition(),
                    dimension: compRef.current.getDimension(),
                    type: compRef.current.getType(),
                    id: compRef.current.getId()
                };
                contents.push(JSON.stringify(designDataObject));
            }
        });

        if (data) {
            patchData("/invoiceTemplate/update", {
                "id": id,
                "html": pageContentRef.current.parentElement.outerHTML,
                "designData": JSON.stringify(contents),
                "templateName": templateName
            }).then((obj) => {
                MDSnackbarOptions
                    .message(MDSnackbarOptions.SUCCESS, "Update Request", "Update request is completed.", Date.now)
                    .then((o) => {
                        showSnack(o);
                    });
            }).catch((e) => {
                console.error(e);
            });

        } else {
            postData("/invoiceTemplate/create", {
                "id": id,
                "html": pageContentRef.current.parentElement.outerHTML,
                "templateName": templateName,
                "designData": JSON.stringify(contents),
            }).then((obj) => {
                setData(obj);
                MDSnackbarOptions
                    .message(MDSnackbarOptions.SUCCESS, "Update Request", "Update request is completed.", Date.now)
                    .then((o) => {
                        showSnack(o);
                    })
            }).catch((e) => {
                console.error(e);
            });
        }

    };
    const showSnack = async (opts) => {
        new Promise((resolve) => {
            if (notificationElement.current) {
                notificationElement.current.show(opts);
                resolve(opts);
            }
        });
    };
    const skelton = () => {
        if (loading) {
            return (
                <Skeleton variant="circular">
                    <Avatar />
                </Skeleton>
            );
        }
        return (<span></span>)
    }
    return (
        <div>
            <Notification ref={notificationElement} />
            <div className="page-container">
                <TextField
                    style={{ width: "300px" }}
                    autoFocus
                    required
                    margin="dense"
                    id="templateName"
                    name="templateName"
                    label="Template Name"
                    type="text"
                    variant="standard"
                    value={templateName}
                    onChange={(event) => {
                        setTemplateName(event.target.value);
                    }}
                />
                <Button className='primary' onClick={savePage}>
                    <Icon fontSize="small" color="inherit">
                        save
                    </Icon>
                    Save
                </Button>
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
                <Button className='primary' onClick={backToThePage}>
                    <Icon fontSize="small" color="inherit">
                        arrow_back
                    </Icon>
                    Back
                </Button>
            </div>
            <div className="page-container">
                <div className="page" page-size="A4" layout="portrait">
                    <div id='pageContent' className="page-content" ref={pageContentRef}>
                        {skelton()}
                        {
                            components.map((comp) => {
                                const style = { zIndex: comp.zIndex };

                                if (comp.type === 'design') {
                                    return (
                                        <DesignComponent
                                            style={style}
                                            ref={comp.dynamicRef}
                                            key={comp.id}
                                            id={comp.id}
                                            deleteEvent={deleteEvent}
                                            selectEvent={selectEvent}
                                            originEvent={originEvent}
                                            content={comp.content}
                                            position={comp.position}
                                            initialDimension={comp.dimension}
                                        />
                                    );
                                }
                                if (comp.type === 'image') {
                                    return (
                                        <ImageUpload
                                            style={style}
                                            ref={comp.dynamicRef}
                                            key={comp.id}
                                            id={comp.id}
                                            deleteEvent={deleteEvent}
                                            selectEvent={selectEvent}
                                            originEvent={originEvent}
                                            content={comp.content}
                                            position={comp.position}
                                            initialDimension={comp.dimension}
                                        />
                                    );
                                }
                                return <span>comp not defined</span>;
                            })
                        }

                    </div>
                </div>
            </div>
        </div>
    )
});

export default A4Page;
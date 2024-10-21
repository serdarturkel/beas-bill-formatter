
import "./A4Page.css";
import "react-resizable/css/styles.css";

import { Icon, Button, Skeleton, Avatar, TextField, Switch, Box, CircularProgress, Stack, LinearProgress } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import DesignComponent from '../design/DesignElement';
import { useReactToPrint } from 'react-to-print';
import ImageUpload from '../image/ImageUpload';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getData, postData, patchData } from "api/api";
import Notification from "components/Notification";
import MDSnackbarOptions from "components/MDSnackbar/options";
import { useLocation } from "react-router-dom";


const A4Page = React.forwardRef(({ selectEvent }) => {
    const [selectedOrigin, originEvent] = useState();
    const navigate = useNavigate();
    const [status, setStatus] = useState(false);
    const statusRef = useRef();

    const [components, setComponents] = useState([]);
    const componentRefs = useRef([]);

    const pageContentRef = useRef();
    const handlePrint = useReactToPrint({ contentRef: pageContentRef });
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const notificationElement = useRef();

    const [templateName, setTemplateName] = useState('');

    const query = new URLSearchParams(useLocation().search);
    const action = query.get("action");

    /**
     start
     **/

    // Elementin class'larına göre stilleri al
    const getCssFromClasses = (element) => {
        const sheets = document.styleSheets; // Tüm CSS dosyaları (styleSheets) buradan alınıyor
        let cssRules = {};

        // Her bir styleSheet'i kontrol et
        for (let i = 0; i < sheets.length; i++) {
            const sheet = sheets[i];

            try {
                // Stil dosyasındaki tüm kuralları gez
                const rules = sheet.rules || sheet.cssRules;
                for (let j = 0; j < rules.length; j++) {
                    const rule = rules[j];

                    if (rule.selectorText) {
                        const selectors = rule.selectorText.split(",");
                        selectors.forEach((selector) => {
                            // Eğer bir class veya ID içeren kural bulursak
                            if (selector.startsWith(".") || selector.startsWith("#")) {
                                if (!cssRules[selector]) {
                                    cssRules[selector] = "";
                                }
                                // CSS kuralını o class veya ID'ye ekle
                                cssRules[selector] += `${rule.style.cssText}\n`;
                            }
                        });
                    }
                }
            } catch (e) {
                console.warn("Cross-origin stylesheet ignored:", sheet.href);
            }
        }

        return cssRules;
    };
    const modifyNode = (tempDiv, nodeName, action) => {
        const items = tempDiv.querySelectorAll(nodeName);
        items.forEach((item) => {
            if (action === 'remove') {
                item.remove();
            }
            else if (action === 'remove-border') {
                item.style.border = 'none';
                item.style.boxSizing = 'none';
            } else if (action === 'hide') {
                item.style.display = 'none';
            }
            else if (action === 'add-border') {
                item.style.border = 'solid 1px #e8e8eb';
            } else {
                console.log("Other action");
            }
        });
    };

    const removeUnnecessaryComponents = () => {
        const printElement = pageContentRef.current;
        const tempDiv = document.createElement("div");

        if (printElement) {
            // Geçici bir DOM elementine çevir
            tempDiv.innerHTML = printElement.innerHTML;

            const removeClassList = ['.codex-editor-overlay', '.ce-inline-toolbar', '.ce-toolbar', '.drag-handle', '.react-resizable-handle', '.tc-add-column', '.tc-add-row', '.tc-toolbox'];
            removeClassList.forEach((cls) => modifyNode(tempDiv, cls, 'remove'));

            const modifyBorderClassList = ['.draggableContent', '.pageContent'];
            modifyBorderClassList.forEach((cls) => modifyNode(tempDiv, cls, 'remove-border'));

            const addBorderStyleClassList = ['.tc-table'];
            addBorderStyleClassList.forEach((cls) => modifyNode(tempDiv, cls, 'add-border'));

        }
        return tempDiv;
    };

    // HTML ve Class tabanlı CSS'i al
    const getHtmlWithCss = () => {
        const element = removeUnnecessaryComponents();
        const htmlContent = element.innerHTML;
        const cssClasses = new Set();

        // Elementin tüm class'larını topla
        const collectClasses = (el) => {
            if (el.classList) {
                el.classList.forEach((cls) => cssClasses.add(`.${cls}`));
            }
            Array.from(el.children).forEach((child) => collectClasses(child));
        };
        collectClasses(element);

        // Class'lara ait stil tanımlamalarını al
        const allCssRules = getCssFromClasses(element);
        let styleContent = "";
        cssClasses.forEach((cls) => {
            if (allCssRules[cls]) {
                styleContent += `${cls} { ${allCssRules[cls]} }\n`;
            }
        });

        // HTML ve CSS stil birleştirme

        const fullHtmlWithCss = `<html><head><title>${id}</title><style>.page {width: 210mm;height: 297mm;background: white;display: inline-block;vertical-align: top;} ${styleContent}</style></head><body style="border:none;margin:0px;padding:0px;"><div class="page">${htmlContent}</div></body></html>`;

        return fullHtmlWithCss;
    };

    const handleExport = () => {
        const htmlWithCss = getHtmlWithCss();

        // Veriyi bir dosyaya yazmak için HTML formatında indirme işlemi
        const blob = new Blob([htmlWithCss], { type: "text/html" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "exportedComponent.html";
        link.click();
    };
    /**
     end
     **/

    const changeZIndex = (clickedId) => {
        setComponents(prevComponents => prevComponents.map(comp => ({ ...comp, zIndex: comp.id === clickedId ? 1 : 0 })));
    };

    const statusChange = (event) => {
        setStatus(event.target.checked);
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
            setStatus(result.status == "ACTIVE");
        } catch (e) {
            console.log(e);
            setData(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (action === "view")
            fetchData();
        else
            setLoading(false);
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

        const htmlData = getHtmlWithCss();

        if (data) {
            patchData("/invoiceTemplate/update", {
                "id": id,
                "html": htmlData,
                "designData": JSON.stringify(contents),
                "templateName": templateName,
                "status": status ? 'ACTIVE' : 'DRAFT',
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
                "html": htmlData,
                "templateName": templateName,
                "designData": JSON.stringify(contents),
                "status": status === true ? 'ACTIVE' : 'DRAFT',
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
                <Stack spacing={2} direction="row" alignItems="center" style={{ margin: "5% 25% none 25%", textAlign: "center", verticalAlign: "middle" }} >
                    <Box sx={{ width: '100%',overflow:"hidden" }}>
                        <LinearProgress /><br/>
                        <span>Loading...</span>
                    </Box>
                </Stack>
            );
        }
        return ('')
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
                <Button className='primary' onClick={handleExport}>
                    <Icon fontSize="small" color="inherit">
                        download
                    </Icon>
                    Export
                </Button>
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
                <Switch checked={status} onChange={statusChange} ref={statusRef} />
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
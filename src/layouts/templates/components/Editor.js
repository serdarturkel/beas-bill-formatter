import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import List from '@editorjs/list';
import Image from '@editorjs/image';
import { Box } from '@mui/material';
import { PDFViewer, StyleSheet } from '@react-pdf/renderer';
import PageA4 from './PageA4';



const Editor = () => {

    const editorInstance = useRef(null);
    const pageA4 = useRef(null);


    const editorContentToHtml = (blocks) => {
        return blocks.map(block => {
            switch (block.type) {
                case 'header':
                    return `<Text title>${block.data.text}</Text>`;
                case 'paragraph':
                    return `<Text>${block.data.text}</Text>`;
                case 'image':
                    return `<Image src={"${block.data.file.url}"} alt="${block.data.caption}" />`;
                // Diğer blok türleri eklenebilir
                default:
                    return '';
            }
        }).join('');
    };

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        }
    });


    useEffect(() => {
        // İlk olarak, 'editorjs' id'sine sahip elementin DOM'da var olup olmadığını kontrol et
        const editorHolder = document.getElementById('editorjs');

        if (editorHolder) {
            // Eğer element DOM'da varsa, EditorJS'i başlat
            editorInstance.current = new EditorJS({
                holder: 'editorjs',
                autofocus: true,
                tools: {
                    header: {
                        class: Header,
                        inlineToolbar: true,
                        data: {
                            text: "Key features",
                            level: 1,
                        },
                    },
                    paragraph: {
                        class: Paragraph,
                        inlineToolbar: true, // Gerekirse düzenlemeler yap
                        data: {
                            text: "Hey. Meet the new Editor. On this picture you can see it in action. Then, try a demo 🤓",
                        }
                    },
                    list: {
                        class: List,
                        inlineToolbar: true, // Gerekirse düzenlemeler yap
                    },
                    image: {
                        class: Image,
                        inlineToolbar: true, // Gerekirse düzenlemeler yap
                        config: {
                            endpoints: {
                                byFile: 'http://localhost:8008/uploadFile', // Dosyayı yüklemek için sunucu endpoint'i
                                byUrl: 'http://localhost:8008/fetchUrl',    // URL'den resmi çekmek için endpoint
                            }
                        }
                    },
                    // Diğer araçlar eklenebilir
                },
                onChange: async () => {
                    const content = await editorInstance.current.save();
                    const htmlContent = editorContentToHtml(content.blocks); // HTML'e dönüştür
                    console.log("HTML Content:" + htmlContent);
                    pageA4.current.changeContent(htmlContent);
                },
            });
        } else {
            console.error("Element with ID 'editorjs' is missing.");
        }

        // Cleanup - bileşen unmount olduğunda editörü yok et
        return () => {
            if (editorInstance.current) {
                editorInstance.current.destroy();
            }
        };
    }, []);

    return (
        <Box>
            <Box>
                <div id="editorjs" style={{ border: '1px solid black', minHeight: '300px' }} />
                <PageA4 ref={pageA4} ></PageA4>
            </Box>
            <PDFViewer style={{ width: '100%', height: '100%' }}>
                <PageA4 ref={pageA4} ></PageA4>
            </PDFViewer>
        </Box>
    );
};

export default Editor;

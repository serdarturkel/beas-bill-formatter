import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import List from '@editorjs/list';
import Image from '@editorjs/image';
import Styles from './Editor.css';
import Quote from '@editorjs/quote';
import NestedList from '@editorjs/nested-list';
import { Checklist, Warning } from '@mui/icons-material';
import Embed from '@editorjs/embed';
import Delimiter from '@editorjs/delimiter';
import CodeTool from '@editorjs/code';
import { AttachesTool } from '@editorjs/attaches';
import InlineCode from '@editorjs/inline-code';
import simpleImage from '@editorjs/simple-image';
import Marker from '@editorjs/marker';
import LinkTool from '@editorjs/link';
import Table from '@editorjs/table'
import simpleImageUmd from '@editorjs/simple-image';


const Editor = () => {

    const editorInstance = useRef(null);


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

    useEffect(() => {
        // İlk olarak, 'editorjs' id'sine sahip elementin DOM'da var olup olmadığını kontrol et
        const editorHolder = document.getElementById('editorjs');

        if (editorHolder) {
            // Eğer element DOM'da varsa, EditorJS'i başlat
            editorInstance.current = new EditorJS({
                holder: 'editorjs',
                tools: {
                    header: {
                        class: Header,
                        inlineToolbar: true,
                        data: {
                            text: "Header",
                            level: 1,
                        },
                    },
                    paragraph: {
                        class: Paragraph,
                        inlineToolbar: true, // Gerekirse düzenlemeler yap
                        
                        data: {
                            text: "Pharagraph",
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
                    nestedList: {
                        class: NestedList,
                        inlineToolbar: true,
                        config: {
                            defaultStyle: 'unordered'
                        },
                    },
                    linkTool: {
                        class: LinkTool,
                        inlineToolbar: true,
                        config: {
                            endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching,
                        }
                    },
                    table: {
                        class: Table,
                        inlineToolbar: true,
                        config: {
                            rows: 2,
                            cols: 3,
                            maxRows: 20,
                            maxCols: 20,
                        },
                    },
                    delimiter: {
                        class: Delimiter,
                        inlineToolbar: true
                    },
                },
                onChange: async () => {
                    const content = await editorInstance.current.save();
                    const htmlContent = editorContentToHtml(content.blocks); // HTML'e dönüştür
                    console.log("HTML Content:" + htmlContent);
                },
                onReady: () => {
                    const totalBlocks = editorInstance.current.blocks.getBlocksCount();
                    for (let i = 0; i < totalBlocks; i++) {
                        editorInstance.current.blocks.stretchBlock(i, true); // Tüm bloklar varsayılan olarak genişletilir
                    }
                }
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
        <div id="editorjs" />
    );
};

export default Editor;

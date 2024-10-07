import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import List from '@editorjs/list';
import NestedList from '@editorjs/nested-list';
import Delimiter from '@editorjs/delimiter';
import LinkTool from '@editorjs/link';
import Table from '@editorjs/table'
import SimpleImage from '@editorjs/simple-image';
const Editor = ({ onClick, id }) => {

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
        const editorHolder = document.getElementById('editorjs-' + id);

        if (editorHolder) {
            // Eğer element DOM'da varsa, EditorJS'i başlat
            editorInstance.current = new EditorJS({
                holder: 'editorjs-' + id,
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
                    simpleImage: {
                        class: SimpleImage,
                        inlineToolbar: true,
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
                        const block = editorInstance.current.blocks.getBlockByIndex(i);
                        if(block.stretch){
                            block.stretch(true);
                        }
                    }
                }
            });
        } else {
            console.error("Element with ID 'editorjs' is missing.");
        }

        // Cleanup - bileşen unmount olduğunda editörü yok et
        return () => {
            if (editorInstance.current) {
                editorInstance.current.destroy(); // Editör örneğini yok et
                editorInstance.current = null; // Editor örneğini null yap
            }
        };
    }, []);

    return (
        <div onClick={onClick} id={"editorjs-" + id} />
    );
};

export default Editor;

import { useState } from "react";
import { Rnd } from "react-rnd";
import Editor from "./components/Editor";

const DesignComponent = ({setSelectedElement,id}) => {
    const handleElementClick = (e) => {
        const element = e.target;
        console.log(element.classList);
        // Elementin property isimlerini al
        const propertyNames = Object.getOwnPropertyNames(element);

        // Tüm property'leri ve değerlerini döngü ile konsola yazdır
        propertyNames.forEach((property) => {
            console.log(`${property}: ${element[property]}`);
        });

        const attributes = element.attributes;

        // Tüm attribute'leri döngü ile konsola yazdır
        for (let i = 0; i < attributes.length; i++) {
            const attr = attributes[i];
            console.log(`${attr.name}: ${attr.value}`);
        }

        setSelectedElement(e.target);
    };

    const [size, setSize] = useState({ width: 200, height: 200 });
    const [position, setPosition] = useState({ x: 0, y: 0 });


    return (<Rnd
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
        {<Editor className="content-box" onClick={handleElementClick} id={id+"-editor"} />}
    </Rnd>)
};

export default DesignComponent;

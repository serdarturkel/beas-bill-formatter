import React from 'react';
import './Ruler.css';

const Ruler = () => {
    return (
        <div className="ruler">
            {Array.from({ length: 101 }, (_, i) => (
                <div key={i} className={`tick ${i % 10 === 0 ? 'long' : 'short'}`}>
                    {i % 10 === 0 && <span className="number">{i}</span>}
                </div>
            ))}
        </div>
    );
};

export default Ruler;

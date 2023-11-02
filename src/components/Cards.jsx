import React, { useState } from 'react';

const Cards = (props) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleCheckboxChange = () => {
        props.onCheckboxChange(props.id);
    };

    const handleDragStart = (e) => {
        e.dataTransfer.setData('text/plain', props.id);
        setIsDragging(true);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const draggedCardId = e.dataTransfer.getData('text/plain');

        if (draggedCardId !== props.id) {
            props.onSwapCards(draggedCardId, props.id);
        }
    };

    return (
        <div
            className={`single-card ${isDragging ? 'is-dragging' : ''}`}
            draggable="true"
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <div className="insider-card relative group bg-white flex justify-center items-center border border-gray-400 rounded w-full h-auto">
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 z-10"></div>
                <input
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={handleCheckboxChange}
                    className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 z-20"
                />
                <img src={props.image} alt={`Image for ID: ${props.id}`} className="w-full object-cover object-center" />
            </div>
        </div>
    );
};

export default Cards;
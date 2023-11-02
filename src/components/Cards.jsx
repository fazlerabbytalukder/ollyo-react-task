import React, { useState } from 'react';

const Cards = (props) => {
    const [isDragging, setIsDragging] = useState(false);

    // Function to handle checkbox state change.
    const handleCheckboxChange = () => {
        props.onCheckboxChange(props.id);
    };

     // Function to handle the start of a drag operation.
    const handleDragStart = (e) => {
        // Set the data being dragged and mark the card as dragging.
        e.dataTransfer.setData('text/plain', props.id);
        setIsDragging(true);
    };

    // Function to handle the end of a drag operation.
    const handleDragEnd = () => {
        // Mark the card as no longer dragging.
        setIsDragging(false);
    };

    // Function to handle the drag-over event (prevents the default behavior).
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // Function to handle the drop event and trigger card swapping.
    const handleDrop = (e) => {
        e.preventDefault();
        const draggedCardId = e.dataTransfer.getData('text/plain');

        // Check if the dragged card is different from the current card and initiate a card swap.
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
                <div className={"absolute inset-0 bg-black opacity-0 group-hover:opacity-50 z-10"}></div>
                <input
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={handleCheckboxChange}
                    className={`absolute top-2 left-2 opacity-0 group-hover:opacity-100 z-20 ${props.isSelected ? "opacity-100":"opacity-0"}`}
                />
                <img src={props.image} alt={`Image for ID: ${props.id}`} className="w-full object-cover object-center" />
            </div>
        </div>
    );
};

export default Cards;
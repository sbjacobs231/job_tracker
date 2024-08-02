import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Marketing({ icon, heading, text }) {
    return (
        <div>
            <FontAwesomeIcon icon={icon} size="4x" className="mb-3" />
            <h2>{heading}</h2>
            <p>{text}</p>
        </div>
    );
}

export default Marketing;

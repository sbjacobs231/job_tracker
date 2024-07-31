import React from 'react';
import { Link } from 'react-router-dom';

function Marketing({ heading, text }) {
    return (
        <div>
            <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false">
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="var(--bs-secondary-color)" />
            </svg>
            <h2 className="fw-normal">{heading}</h2>
            <p>{text}</p>
            <p><a className="btn btn-secondary" href="#">View details &raquo;</a></p>
        </div>
    );
}

export default Marketing;

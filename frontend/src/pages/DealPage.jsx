import React from 'react';
import { useParams } from 'react-router-dom';

function DealPage() {
    const { id } = useParams();
    return (
        <div style={{ padding: '2rem' }}>
            <h2>Deal ID: {id}</h2>
            <p>Deal details and chat will go here.</p>
        </div>
    );
}

export default DealPage;

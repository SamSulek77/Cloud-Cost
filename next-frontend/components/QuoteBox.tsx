'use client';

import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { API_ENDPOINTS } from '@/lib/constants';

export default function QuoteBox() {
    // 1. Create a place to store the text
    const [text, setText] = useState('Loading...');
    const [author, setAuthor] = useState('');

    // 2. This runs ONCE when the box appears
    useEffect(() => {
        // Go get the data from the backend
        axios.get(API_ENDPOINTS.QUOTE)
            .then(response => {
                // When data arrives, save it
                setText(response.data.quote);
                setAuthor(response.data.author);
            });
    }, []);

    // 3. Show the box on the screen
    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', marginTop: '20px' }}>
            <h3>Quote of the Day</h3>
            <p>"{text}"</p>
            <small>- {author}</small>
        </div>
    );
}

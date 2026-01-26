'use client'

import { useEffect, useState } from "react"
import axios from "@/lib/axios"
import { API_ENDPOINTS } from "@/lib/constants"

export default function RandomQuote2() {
    const [text, setText] = useState('Loading...');
    const [author, setAuthor] = useState('');

    useEffect(() => {
        axios.get(API_ENDPOINTS.QUOTE3)
            .then(response => {
                setText(response.data.quote);
                setAuthor(response.data.author);

            });

    }, []);

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', marginTop: '30px' }}>
            <h3>Quote of the day</h3>
            <p>"{text}"</p>
            <small>- {author}</small>
        </div>
    );
}
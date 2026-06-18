import { useState } from "react";

const RANDOM_QUOTE_URL = "";

export default function QuoteFetcher() {
    const [quote, setQuote] = useeState({text: "", author: ""});

    useEffect(() => {    
        async function getInitialQuote() {
            const response = await fetch(RANDOM_QUOTE_URL);
            const jsonResponse = await response.json();
            const randomQuote = jsonResponse.qoute;
            setQuote(randomQuote);
        }
        getInitialQuote();
    }, []);

    async function fetchQuote() {
        const response = await fetch(RANDOM_QUOTE_URL);
        const jsonResponse = await response.json();
        const randomQuote = jsonResponse.qoute;
        setQuote(randomQuote);
    }

    return (
        <div>
            <button onClick={fetchQuote}>格言を取得</button>
            <h1>{quote.text}</h1>
            <h3>{quote.author}</h3>
        </div>
    );
}
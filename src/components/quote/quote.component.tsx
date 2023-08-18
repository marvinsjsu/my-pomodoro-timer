import { FC, useState, useEffect } from "react";

import "./quote.modules.css";

const quoteApiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
const proxyApiUrl = 'https://corsproxy.io/?';
const proxiedApiUrl = `${proxyApiUrl}${encodeURIComponent(quoteApiUrl)}`;

type TQuote = {
  text: string;
  author?: string;
};

const Quote:FC = () => {
  const [quote, setQuote] = useState<TQuote | null>(null);

  useEffect(() => {
    async function fetchQuote() {
      const response = await fetch(proxiedApiUrl);
      const data = await response.json();
      const quote = {
        text: data.quoteText,
        author: data.quoteAuthor,
      };

      setQuote(quote);
    }   

    try {
      fetchQuote();
    } catch(error) {
      console.log('Error fetching quote - ', error);
    }

  }, []);

  if (!quote) return null;

  return (
    <div className="quote-container">
      <p>{quote?.text}</p>
      <p className="author">by {quote?.author}</p>
    </div>
  );
};

export default Quote;

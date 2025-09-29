import { useState, useEffect } from 'react';
import { listGmailEmails } from '../services/gmail';

export const useGmailEmails = (accessToken, maxResults = 5) => {
  const [gmailEmails, setGmailEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!accessToken) {
      setIsLoading(false);
      return;
    }

    const fetchGmailData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await listGmailEmails(accessToken, maxResults);
        setGmailEmails(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGmailData();
  }, [accessToken, maxResults]);

  return { gmailEmails, isLoading, error };
};
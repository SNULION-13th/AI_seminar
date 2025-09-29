import { useState, useEffect } from 'react';
import { getGmailContent } from '../services/gmail';

export const useGmailContent = (accessToken, emailId) => {
  const [gmailContent, setGmailContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!accessToken || !emailId) {
      setIsLoading(false);
      return;
    }

    const fetchGmailData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getGmailContent(accessToken, emailId);
        setGmailContent(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGmailData();
  }, [accessToken, emailId]);

  return { gmailContent, isLoading, error };
};
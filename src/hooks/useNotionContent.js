import { useState, useEffect } from 'react';

export const useNotionContent = (pageId) => {
  const [notionContent, setNotionContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pageId) {
      setIsLoading(false);
      return;
    }

    const fetchNotionContent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:3001/api/notion/get-page-content', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pageId }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || '백엔드에서 Notion 콘텐츠 가져오기 실패');
        }

        const data = await response.json();
        setNotionContent(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotionContent();
  }, [pageId]);

  return { notionContent, isLoading, error };
};
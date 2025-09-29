import { useMutation } from '@tanstack/react-query';
import { createNotiPage } from '../services/notion';

export const useCreateNotiPage = () => {
  return useMutation({
    mutationFn: (pageData) => createNotiPage(pageData),
    onSuccess: (data) => {
      console.log('Notion 페이지가 성공적으로 생성되었습니다.', data);
      alert(`Notion 페이지 생성 성공! URL: ${data.results[0].url}`);
    },
    onError: (error) => {
      console.error('Notion 페이지 생성 중 오류가 발생했습니다.', error);
      alert('Notion 페이지 생성 실패. 콘솔을 확인하세요.');
    },
  });
};

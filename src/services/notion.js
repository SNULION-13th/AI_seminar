/**
 * Notion API와 통신하는 함수들
 */

// 이 파일의 함수들은 백엔드 API를 호출하여 Notion 페이지를 생성합니다.

/**
 * Notion 데이터베이스에 새 페이지를 생성합니다.
 * @param {{ parent: { database_id: string }, properties: object, content: string }} pageData - 생성할 페이지 데이터
 * @returns {Promise<object>} 생성된 페이지 정보
 */
export const createNotiPage = async (pageData) => {
  console.log("Notion 페이지 생성 요청 (프론트엔드 -> 백엔드):", pageData);

  try {
    const response = await fetch('http://localhost:3001/api/notion/create-page', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pageData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '백엔드에서 Notion 페이지 생성 실패');
    }

    const data = await response.json();
    console.log("Notion 페이지 생성 성공 (백엔드 응답):", data);
    return data;
  } catch (error) {
    console.error("Notion 페이지 생성 중 오류가 발생했습니다 (프론트엔드):", error);
    throw error;
  }
};

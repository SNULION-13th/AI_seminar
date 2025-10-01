/**
 * 백엔드 API(/api/addTask)를 호출하여 Notion에 새로운 태스크를 추가합니다.
 * @param {string} taskName - 추가할 태스크의 이름
 * @param {string} [dueDate] - (선택) 마감일 (YYYY-MM-DD 형식)
 */
export const addTaskToNotion = async (taskName, dueDate) => {
  try {
    const response = await fetch('/api/addTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskName, dueDate }),
    });

    if (!response.ok) {
      // 서버가 4xx 또는 5xx 응답을 반환한 경우
      const errorData = await response.json();
      throw new Error(errorData.message || '서버에서 오류가 발생했습니다.');
    }

    const result = await response.json();
    console.log('성공적으로 Notion에 추가:', result.message);
    return result;

  } catch (error) {
    // 네트워크 오류 또는 JSON 파싱 오류 등
    console.error("Error adding task via API:", error);
    // UI에 오류를 표시하고 싶다면 여기서 오류를 다시 throw 할 수 있습니다.
    // throw error;
  }
};

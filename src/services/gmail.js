/**
 * Gmail API와 통신하는 함수들
 */

const BACKEND_URL = 'http://localhost:3001';

/**
 * Google OAuth 인증 URL을 가져옵니다.
 * @returns {string} 인증 URL
 */
export const getGoogleAuthUrl = () => {
  return `${BACKEND_URL}/auth/google`;
};

/**
 * Gmail 이메일 내용을 가져옵니다.
 * @param {string} accessToken - Google Access Token
 * @param {string} emailId - 가져올 이메일의 ID
 * @returns {Promise<object>} 이메일 내용
 */
export const getGmailContent = async (accessToken, emailId) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/gmail/get-email-content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken, emailId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '백엔드에서 Gmail 콘텐츠 가져오기 실패');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Gmail 콘텐츠 가져오기 중 오류 발생:', error);
    throw error;
  }
};

/**
 * Gmail 이메일 목록을 가져옵니다.
 * @param {string} accessToken - Google Access Token
 * @param {number} maxResults - 가져올 이메일의 최대 개수
 * @returns {Promise<Array<object>>} 이메일 목록
 */
export const listGmailEmails = async (accessToken, maxResults = 5) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/gmail/list-emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken, maxResults }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '백엔드에서 Gmail 이메일 목록 가져오기 실패');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Gmail 이메일 목록 가져오기 중 오류 발생:', error);
    throw error;
  }
};

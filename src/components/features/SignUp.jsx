import React, { useState } from 'react';

const SignUp = ({ onNavigate }) => {
  const [email, setEmail] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    if (email) {
      alert(`회원가입 이메일이 ${email}(으)로 전송되었습니다!`);
      // Here you would typically call an API to send the email
      setEmail('');
      onNavigate('list'); // Navigate back to the list view after signing up
    } else {
      alert('이메일 주소를 입력해주세요.');
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800">회원가입</h2>
      <form onSubmit={handleSignUp} className="space-y-6">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            이메일 주소
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            이메일로 계속하기
          </button>
        </div>
      </form>
      <p className="text-sm text-center text-gray-500">
        이미 계정이 있으신가요?{' '}
        <button onClick={() => onNavigate('list')} className="font-medium text-indigo-600 hover:text-indigo-500">
          로그인
        </button>
      </p>
    </div>
  );
};

export default SignUp;

import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-gray-500 mb-8">页面未找到</p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
      >
        返回首页
      </Link>
    </div>
  );
};

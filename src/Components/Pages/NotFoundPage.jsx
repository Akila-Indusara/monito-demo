import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="max-w-md text-center">
                <h1 className="text-6xl font-bold text-blue-900">404</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
                <p className="text-gray-600 mt-2">
                    Oops! The page you&#39;re looking for doesn&#39;t exist.
                </p>

                <Link to="/"
                      className="mt-6 inline-block bg-blue-900 text-white px-6 py-3 rounded-full hover:bg-blue-700">
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};
export default NotFoundPage;
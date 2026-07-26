import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="font-poppins min-h-screen w-full bg-surface-50 text-surface-800 flex flex-col items-center justify-center px-6 py-12 antialiased select-none">
            <div className="text-center max-w-md w-full flex flex-col items-center">

                {/* Animated/Styled 404 Badge */}
                <div className="relative mb-6">
                    <h1 className="text-9xl font-extrabold text-surface-200 tracking-widest sm:text-[12rem]">
                        404
                    </h1>
                    <div className="flex items-center justify-center">
                        <div className="bg-primary-500 text-white px-3 py-1 text-sm rounded-md font-medium tracking-wide shadow-lg whitespace-nowrap">
                            Page Not Found
                        </div>
                    </div>
                </div>

                {/* Informative Text */}
                <h2 className="text-2xl font-bold text-surface-900 mb-3 sm:text-3xl">
                    Lost in Space?
                </h2>
                <p className="text-surface-600 mb-8 max-w-sm text-sm sm:text-base leading-relaxed">
                    The page you are looking for doesn't exist or has been moved to another universe.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-surface-100 text-surface-700 font-medium rounded-xl border border-surface-200 transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-sm"
                    >
                        Go Back
                    </button>

                    <Link
                        to="/dashboard"
                        className="w-full sm:w-auto px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors duration-200 text-sm text-center shadow-md shadow-primary-500/10 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    >
                        Back to Dashboard
                    </Link>
                </div>

            </div>
        </div>
    );
}
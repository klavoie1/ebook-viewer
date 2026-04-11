import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
        }
    };

    return (
        <nav className="bg-surface-a10 text-white p-4 sticky top-0 z-50 shadow-md shadow-primary-a0/30 border-b border-surface-a30">
            <div className="flex flex-row justify-between items-center">

                <Link to="/" className="text-3xl font-bold shrink-0">Keeper</Link>

                <div className="flex items-center space-x-8">
                    <form onSubmit={handleSearch} className="w-96">
                        <div className="relative group">
                            {/* Search Icon */}
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-auto">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="20px"
                                    viewBox="0 -960 960 960"
                                    width="20px"
                                    fill="#9ca3af" /* Light gray color */
                                    className="group-focus-within:fill-primary-a0 transition-colors"
                                >
                                    <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
                                </svg>
                            </div>

                            {/* Input Field */}
                            <input
                                type="text"
                                placeholder="Search books..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-surface-a10 border border-surface-a30 rounded-lg text-light-a0 placeholder-surface-a50 focus:outline-none focus:ring-2 focus:ring-primary-a0 focus:border-transparent transition-all"
                            />
                        </div>
                    </form>

                    <div className="space-x-6 shrink-0">
                        <Link to="/" className="hover:text-primary-a40">Home</Link>
                        <Link to="/ebooks" className="hover:text-primary-a40">Ebooks</Link>
                    </div>
                </div>

            </div>
        </nav>
    );
}
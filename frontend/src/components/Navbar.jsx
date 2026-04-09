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
        <nav className="bg-surface-a20 text-white p-4 sticky top-0 z-50 shadow-md border-b-2 border-surface-a50">
            <div className="flex flex-row justify-between items-center">

                <Link to="/" className="text-3xl font-bold shrink-0">Ebook Tracker</Link>

                <div className="flex items-center space-x-8">
                    <form onSubmit={handleSearch} className="w-96 border border-light-a0 rounded-lg hover:border-primary-a0">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 rounded-md text-surface-a50 focus:outline-none focus:ring-2 focus:ring-primary-a0"
                        />
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
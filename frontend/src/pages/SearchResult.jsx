import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getEbookList } from '../services/EbookListService.jsx';

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAndFilter = async () => {
            try {
                const allEbooks = await getEbookList();
                const filtered = allEbooks.filter(ebook =>
                    ebook.title.toLowerCase().includes(query.toLowerCase()) ||
                    ebook.author.toLowerCase().includes(query.toLowerCase()) ||
                    ebook.characters.some(char => char.toLowerCase().includes(query.toLowerCase()))
                );
                setResults(filtered);
            } catch (error) {
                console.error('Error searching:', error);
            } finally {
                setLoading(false);
            }
        };

        if (query) fetchAndFilter();
    }, [query]);

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-2">Search Results</h1>
            <p className="text-gray-600 mb-8">Found {results.length} result(s) for "{query}"</p>

            {results.length === 0 ? (
                <p className="text-gray-500">No ebooks found matching your search.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.map(ebook => (
                        <Link
                            key={ebook._id.$oid}
                            to={`/ebooks/${ebook._id.$oid}`}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
                        >
                            <h2 className="text-xl font-bold mb-2">{ebook.title}</h2>
                            <p className="text-gray-600 mb-4">{ebook.author}</p>
                            <p className="text-sm text-gray-500">{ebook.genre.join(', ')}</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
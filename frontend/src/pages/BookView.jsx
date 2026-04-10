import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEbookById } from "../services/EbookListService.jsx";

export default function BookView() {
    const { id } = useParams();
    const [ebook, setEbook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            setLoading(true);
            try {
                const data = await getEbookById(id);
                if (data && data.success === false) {
                    setEbook(null);
                } else {
                    setEbook(data);
                }
            } catch (error) {
                console.error("Error fetching ebook details:", error);
                setEbook(null);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    if (loading) return <div className="p-8 text-light-a0 bg-surface-a0 min-h-screen">Loading ebook details...</div>;
    if (!ebook) return <div className="p-8 text-light-a0 bg-surface-a0 min-h-screen">Ebook not found.</div>;

    return (
        <div className="flex flex-col items-center min-h-screen bg-surface-a0 p-8 text-light-a0">
            <div className="max-w-6xl w-full flex flex-col md:flex-row gap-12 mt-10">

                <div className="w-full md:w-1/3 flex justify-center">
                    <div className="w-80 h-125 rounded-lg overflow-hidden shadow-2xl bg-surface-a20">
                        {ebook.metadata && ebook.metadata.coverImagePath ? (
                            <img
                                src={`http://localhost:8080/ebookviewer/ebook/image/${ebook.metadata.coverImagePath}`}
                                alt={ebook.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-surface-a50 italic">
                                No Cover Available
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-full md:w-2/3 flex flex-col">
                    <h1 className="text-5xl font-bold mb-2">{ebook.title}</h1>
                    <p className="text-2xl text-primary-a30 mb-6">{ebook.author}</p>

                    <hr className="border-surface-a30 mb-6" />

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2 text-surface-a50">Summary</h3>
                        <p className="leading-relaxed text-lg">
                            {ebook.summary || "No summary available for this book."}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-8 bg-surface-a10 p-6 rounded-lg">
                        <div>
                            <p className="text-surface-a50 text-sm">ISBN</p>
                            <p className="font-medium">{ebook.isbn || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-surface-a50 text-sm">Published Date</p>
                            <p className="font-medium">{ebook.publishedDate || "Unknown"}</p>
                        </div>
                        <div>
                            <p className="text-surface-a50 text-sm">File Format</p>
                            <span className="bg-primary-a0 text-dark-a0 px-2 py-0.5 rounded text-xs font-bold uppercase">
                                {ebook.metadata?.fileFormat || "Unknown"}
                            </span>
                        </div>
                        <div>
                            <p className="text-surface-a50 text-sm">Language</p>
                            <p className="font-medium">{ebook.metadata?.language || "N/A"}</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-sm text-surface-a50 uppercase tracking-wider mb-2">Genres</h3>
                        <div className="flex flex-wrap gap-2">
                            {ebook.genre.map((g) => (
                                <Link
                                    key={g}
                                    to={`/ebook/genre/${g}`}
                                    className="px-3 py-1 bg-surface-a20 hover:bg-primary-a0 hover:text-dark-a0 transition-colors rounded-full text-sm"
                                >
                                    {g}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {ebook.characters && ebook.characters.length > 0 && (
                        <div>
                            <h3 className="text-sm text-surface-a50 uppercase tracking-wider mb-2">Key Characters</h3>
                            <div className="flex flex-wrap gap-2">
                                {ebook.characters.map((char) => (
                                    <span key={char} className="px-3 py-1 border border-surface-a30 rounded-full text-sm italic">
                                        {char}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-12">
                        <Link to="/ebooks" className="text-primary-a40 hover:underline flex items-center gap-2">
                            ← Back to Collection
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
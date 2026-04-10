import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEbooksByGenre } from "../services/EbookListService.jsx";

export default function TagPage() {
    const { genre } = useParams();
    const [ebooks, setEbooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTaggedEbooks = async () => {
            setLoading(true);
            try {
                const data = await getEbooksByGenre(genre);
                setEbooks(data);
            } catch (error) {
                console.error(`Error fetching ebooks for tag: ${genre}`, error);
            } finally {
                setLoading(false);
            }
        };

        fetchTaggedEbooks();
    }, [genre]);

    if (loading) return <div className="p-8 text-light-a0">Loading ebooks for {genre}...</div>;

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-surface-a0 p-8">
            <h1 className="text-4xl font-bold mb-2 text-light-a0 capitalize">{genre} Ebooks</h1>
            <p className="text-surface-a50 mb-6">Showing all books with genre as {genre}</p>

            <hr className="border border-primary-a0 w-full mb-9"/>

            <p className="relative flex flex-row justify-end text-surface-a50 mb-6 top-0">Total {genre} Ebooks: {ebooks.length}</p>

            {ebooks.length === 0 ? (
                <div className="text-light-a0 text-xl mt-10">No ebooks found for this tag.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-8">
                    {ebooks.map(ebook => (
                        <Link
                            key={ebook._id.$oid}
                            to={`/ebooks/${ebook._id.$oid}`}
                            className="relative group w-64 h-96 rounded-lg overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300 bg-surface-a20"
                        >

                            {ebook.metadata && ebook.metadata.coverImagePath ? (
                                <img
                                    src={`http://localhost:8080/ebookviewer/ebook/image/${ebook.metadata.coverImagePath}`}
                                    alt={ebook.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-surface-a10 text-surface-a50 italic text-center p-4">
                                    No Cover Available
                                </div>
                            )}


                            <div className="absolute inset-0 bg-linear-to-t from-dark-a0/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">

                                <div className="absolute inset-s-0 top-0 left-0 justify-start items-left p-4">
                                    <label className="text-sm text-dark-a0 bg-primary-a10/70 p-0.75 rounded-lg">
                                        {ebook.metadata && ebook.metadata.fileFormat}
                                    </label>
                                </div>

                                <h2 className="text-light-a0 text-lg font-bold leading-tight">{ebook.title}</h2>
                                <p className="text-surface-a50 text-sm mt-1">{ebook.author}</p>

                                <div className="mt-2 flex flex-wrap gap-1">
                                    {ebook.genre.slice(0, 4).map((g, i) => (
                                        <span
                                            key={`${ebook._id.$oid}-${g}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                window.location.href = `/ebook/genre/${g}`;
                                            }}
                                            className="text-[11px] bg-light-a0/20 text-light-a0 px-2 py-0.5 rounded hover:bg-surface-a50 cursor-pointer relative z-10"
                                        >
                                            {g}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
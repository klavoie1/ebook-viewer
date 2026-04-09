import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEbookList} from "../services/EbookListService.jsx";

export default function EbookList() {
    const [ebooks, setEbooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEbooks = async () => {
            setLoading(true);
            try {
                const data = await getEbookList();
                setEbooks(data);
            } catch (error) {
                console.error("Error fetching Ebooks", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEbooks();
    }, []);

    if (loading) return <div className="p-8 text-light-a0">Loading...</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-surface-a0 p-8">
            <h1 className="text-3xl font-bold mb-8 text-light-a0">All Ebooks</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-8">
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

                        <div className="absolute inset-0 bg-linear-to-t from-dark-a0/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">

                            {/*Creates a badge near the top left of the book card. Not sure if implemented in the cleanest way, but it works for now. May need to revisit.*/}
                            <div className="absolute inset-y-0 left-0 justify-start items-left p-4">
                                <label className="text-sm text-dark-a0 bg-primary-a10 p-0.75 rounded-md">{ebook.metadata && ebook.metadata.fileFormat}</label>
                            </div>

                            <h2 className="text-light-a0 text-lg font-bold leading-tight">{ebook.title}</h2>
                            <p className="text-surface-a50 text-sm mt-1">{ebook.author}</p>
                            <div className="mt-2 flex flex-wrap gap-1">
                                {ebook.genre.slice(0, 4).map((g, i) => (
                                    <span key={i} className="text-[10px] bg-light-a0/20 text-light-a0 px-2 py-0.5 rounded">
                                        {g}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
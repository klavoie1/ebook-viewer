import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getEbookById, updateEbook } from "../services/EbookListService.jsx";

export default function BookView() {
    const { id } = useParams();
    const [ebook, setEbook] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        const fetchBook = async () => {
            setLoading(true);
            try {
                const data = await getEbookById(id);
                if (data && data.success === false) {
                    setEbook(null);
                } else {
                    setEbook(data);
                    setEditData(data);
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

    const handleUpdate = async () => {
        try {
            const finalData = {
                ...editData,
                genre: typeof editData.genre === 'string'
                    ? editData.genre.split(',').map(g => g.trim()).filter(g => g !== "")
                    : editData.genre,
                characters: typeof editData.characters === 'string'
                    ? editData.characters.split(',').map(c => c.trim()).filter(c => c !== "")
                    : editData.characters
            };

            const updated = await updateEbook(id, finalData);
            setEbook(updated);
            setIsEditing(false);
            alert("Ebook updated successfully!");
        } catch (error) {
            console.error("Update failed:", error);
            alert("Failed to update ebook.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setEditData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setEditData(prev => ({ ...prev, [name]: value }));
        }
    };

    if (loading) return <div className="flex items-center justify-center p-8 text-light-a0 bg-surface-a0 max-h-screen h-screen">Loading ebook details...</div>;
    if (!ebook) return <div className="flex items-center justify-center p-8 text-light-a0 bg-surface-a0 max-h-screen h-screen">Ebook not found.</div>;

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
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                            {isEditing ? (
                                <input
                                    name="title"
                                    value={editData.title}
                                    onChange={handleChange}
                                    className="text-5xl font-bold bg-surface-a10 border-b border-primary-a0 w-full mb-2 focus:outline-none"
                                />
                            ) : (
                                <h1 className="text-5xl font-bold mb-2">{ebook.title}</h1>
                            )}

                            {isEditing ? (
                                <input
                                    name="author"
                                    value={editData.author}
                                    onChange={handleChange}
                                    className="text-2xl text-primary-a30 bg-surface-a10 border-b border-primary-a0 w-full focus:outline-none"
                                />
                            ) : (
                                <p className="text-2xl text-primary-a30 mb-6">{ebook.author}</p>
                            )}
                        </div>

                        <div className="ml-4 flex gap-2">
                            {isEditing ? (
                                <>
                                    <button onClick={handleUpdate} className="bg-success-a0 hover:bg-success-a10 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors">Save</button>
                                    <button onClick={() => { setIsEditing(false); setEditData(ebook); }} className="bg-surface-a30 hover:bg-surface-a40 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors">Cancel</button>
                                </>
                            ) : (
                                <button onClick={() => setIsEditing(true)} className="bg-primary-a0 hover:bg-primary-a20 text-dark-a0 px-6 py-2 rounded-lg font-bold transition-transform hover:scale-105 cursor-pointer">Edit Info</button>
                            )}
                        </div>
                    </div>

                    <hr className="border-surface-a30 mb-6" />

                    <div className="mb-6">
                        <h3 className="text-2xl font-semibold mb-2 text-surface-a50">Summary</h3>
                        {isEditing ? (
                            <textarea
                                name="summary"
                                value={editData.summary}
                                onChange={handleChange}
                                placeholder="Use **bold**, *italics*, or lists..."
                                className="w-full h-48 bg-surface-a10 p-4 rounded-lg border border-surface-a30 focus:border-primary-a0 focus:outline-none leading-relaxed text-lg"
                            />
                        ) : (
                            <div className="leading-relaxed text-lg prose prose-invert max-w-none prose-p:mb-4 text-light-a0/90">
                                {ebook.summary ? (
                                    <ReactMarkdown>{ebook.summary}</ReactMarkdown>
                                ) : (
                                    <span className="italic text-surface-a40">No summary available.</span>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-8 bg-surface-a10 p-6 rounded-lg">
                        <div>
                            <p className="text-surface-a50 text-sm">ISBN</p>
                            {isEditing ? (
                                <input name="isbn" value={editData.isbn} onChange={handleChange} className="bg-transparent border-b border-surface-a40 w-full focus:outline-none" />
                            ) : (
                                <p className="font-medium">{ebook.isbn || "N/A"}</p>
                            )}
                        </div>
                        <div>
                            <p className="text-surface-a50 text-sm">Published Date</p>
                            {isEditing ? (
                                <input name="publishedDate" value={editData.publishedDate} onChange={handleChange} className="bg-transparent border-b border-surface-a40 w-full focus:outline-none" />
                            ) : (
                                <p className="font-medium">{ebook.publishedDate || "Unknown"}</p>
                            )}
                        </div>
                        <div>
                            <p className="text-surface-a50 text-sm">File Format</p>
                            {isEditing ? (
                                <input
                                    name="metadata.fileFormat"
                                    value={editData.metadata?.fileFormat || ""}
                                    onChange={handleChange}
                                    className="bg-transparent border-b border-surface-a40 w-full focus:outline-none"
                                />
                            ) : (
                                <span className="bg-primary-a0 text-dark-a0 px-2 py-0.5 rounded text-xs font-bold uppercase">
                                    {ebook.metadata?.fileFormat || "Unknown"}
                                </span>
                            )}
                        </div>
                        <div>
                            <p className="text-surface-a50 text-sm">Language</p>
                            {isEditing ? (
                                <input
                                    name="metadata.language"
                                    value={editData.metadata?.language || ""}
                                    onChange={handleChange}
                                    className="bg-transparent border-b border-surface-a40 w-full focus:outline-none"
                                />
                            ) : (
                                <p className="font-medium">{ebook.metadata?.language || "N/A"}</p>
                            )}
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-sm text-surface-a50 uppercase tracking-wider mb-2">Genres</h3>
                        {isEditing ? (
                            <input
                                name="genre"
                                value={Array.isArray(editData.genre) ? editData.genre.join(', ') : editData.genre}
                                onChange={handleChange}
                                placeholder="Action, Adventure, Fantasy..."
                                className="w-full bg-surface-a10 p-2 rounded border border-surface-a30 focus:border-primary-a0 focus:outline-none text-sm"
                            />
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {ebook.genre.map((g) => (
                                    <Link key={g} to={`/ebook/genre/${g}`} className="px-3 py-1 bg-surface-a20 hover:bg-primary-a0 hover:text-dark-a0 transition-colors rounded-full text-sm">
                                        {g}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mb-6">
                        <h3 className="text-sm text-surface-a50 uppercase tracking-wider mb-2">Key Characters</h3>
                        {isEditing ? (
                            <input
                                name="characters"
                                value={Array.isArray(editData.characters) ? editData.characters.join(', ') : editData.characters}
                                onChange={handleChange}
                                placeholder="Character A, Character B..."
                                className="w-full bg-surface-a10 p-2 rounded border border-surface-a30 focus:border-primary-a0 focus:outline-none text-sm"
                            />
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {ebook.characters && ebook.characters.length > 0 ? (
                                    ebook.characters.map((char) => (
                                        <span key={char} className="px-3 py-1 border border-surface-a30 rounded-full text-sm italic">
                                            {char}
                                        </span>
                                    ))
                                ) : <p className="text-surface-a40 italic text-sm">No characters listed.</p>}
                            </div>
                        )}
                    </div>

                    {!isEditing && (
                        <div className="mt-12">
                            <Link to="/ebooks" className="text-primary-a40 hover:underline flex items-center gap-2">
                                ← Back to Collection
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addEbook } from "../services/EbookListService.jsx";

export default function NewBook() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        summary: "",
        isbn: "",
        publishedDate: "",
        genre: "",
        characters: "",
        metadata: {
            fileFormat: "",
            language: ""
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const finalData = {
                ...formData,
                genre: formData.genre.split(',').map(g => g.trim()).filter(g => g !== ""),
                characters: formData.characters.split(',').map(c => c.trim()).filter(c => c !== "")
            };

            await addEbook(finalData);
            alert("Book added successfully!");
            navigate("/ebooks");
        } catch (error) {
            console.error("Failed to add ebook:", error);
            alert("Error adding book. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-surface-a0 p-8 text-light-a0">
            <div className="max-w-4xl w-full mt-10">
                <h1 className="text-5xl font-bold mb-2">Add New Book</h1>
                <p className="text-surface-a50 mb-8">Fill out the details below to add a new book to your collection.</p>

                <hr className="border-surface-a30 mb-9" />

                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <input
                            name="title"
                            placeholder="Book Title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="text-4xl font-bold bg-surface-a10 border-b border-primary-a0 w-full py-2 focus:outline-none placeholder-surface-a30"
                        />
                        <input
                            name="author"
                            placeholder="Author Name"
                            value={formData.author}
                            onChange={handleChange}
                            required
                            className="text-2xl text-primary-a30 bg-surface-a10 border-b border-primary-a0 w-full py-2 focus:outline-none placeholder-surface-a30"
                        />
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-surface-a50">Summary</h3>
                        <textarea
                            name="summary"
                            placeholder="Write a brief summary... (Markdown supported)"
                            value={formData.summary}
                            onChange={handleChange}
                            className="w-full h-48 bg-surface-a10 p-4 rounded-lg border border-surface-a30 focus:border-primary-a0 focus:outline-none leading-relaxed text-lg"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface-a10 p-6 rounded-lg">
                        <div>
                            <label className="text-surface-a50 text-sm block mb-1">ISBN</label>
                            <input name="isbn" value={formData.isbn} onChange={handleChange} className="bg-transparent border-b border-surface-a40 w-full focus:outline-none focus:border-primary-a0" />
                        </div>
                        <div>
                            <label className="text-surface-a50 text-sm block mb-1">Published Date</label>
                            <input name="publishedDate" value={formData.publishedDate} onChange={handleChange} className="bg-transparent border-b border-surface-a40 w-full focus:outline-none focus:border-primary-a0" />
                        </div>
                        <div>
                            <label className="text-surface-a50 text-sm block mb-1">File Format</label>
                            <input name="metadata.fileFormat" value={formData.metadata.fileFormat} onChange={handleChange} className="bg-transparent border-b border-surface-a40 w-full focus:outline-none focus:border-primary-a0" />
                        </div>
                        <div>
                            <label className="text-surface-a50 text-sm block mb-1">Language</label>
                            <input name="metadata.language" value={formData.metadata.language} onChange={handleChange} className="bg-transparent border-b border-surface-a40 w-full focus:outline-none focus:border-primary-a0" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div>
                            <h3 className="text-sm text-surface-a50 uppercase tracking-wider mb-2">Genres</h3>
                            <input
                                name="genre"
                                value={formData.genre}
                                onChange={handleChange}
                                placeholder="Action, Adventure, Fantasy..."
                                className="w-full bg-surface-a10 p-3 rounded border border-surface-a30 focus:border-primary-a0 focus:outline-none text-sm"
                            />
                        </div>
                        <div>
                            <h3 className="text-sm text-surface-a50 uppercase tracking-wider mb-2">Key Characters</h3>
                            <input
                                name="characters"
                                value={formData.characters}
                                onChange={handleChange}
                                placeholder="Character A, Character B..."
                                className="w-full bg-surface-a10 p-3 rounded border border-surface-a30 focus:border-primary-a0 focus:outline-none text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                        <button
                            type="submit"
                            className="bg-primary-a0 hover:bg-primary-a20 text-dark-a0 px-8 py-3 rounded-lg font-bold transition-all hover:scale-105 cursor-pointer shadow-lg"
                        >
                            Add Book
                        </button>
                        <Link
                            to="/ebooks"
                            className="bg-surface-a30 hover:bg-surface-a40 text-light-a0 px-8 py-3 rounded-lg font-bold transition-all cursor-pointer"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
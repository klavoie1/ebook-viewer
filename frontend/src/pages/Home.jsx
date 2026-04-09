import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-surface-a0">
            <h1 className="text-4xl font-bold mb-4 text-light-a0">Welcome to Ebook Tracker</h1>
            <p className="text-surface-a40 mb-8">Manage and explore your Ebook collection</p>
            <Link
                to="/ebooks"
                className="px-6 bg-primary-a0 py-3 text-dark-a0 rounded-lg hover:bg-primary-a20 hover:scale-105"
            >
                View All Ebooks
            </Link>
        </div>
    );
}
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/ugur-akdemir-XT-o5O458as-unsplash.jpg';

export default function Home() {
    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative"
            style={{
                backgroundImage: `linear-gradient(rgba(18, 18, 18, 0.92), rgba(18, 18, 18, 0.99)), url(${backgroundImage})`
            }}
        >
            <h1 className="text-5xl font-bold mb-4 text-light-a0">Welcome to Keeper</h1>
            <p className="text-md text-surface-a40 mb-8 font-semibold bg-dark-a0/30 px-4 py-1 rounded-lg">
                Manage and explore your Ebook collection
            </p>
            <Link
                to="/ebooks"
                className="px-6 bg-linear-to-r from-primary-a40 to-primary-a0 py-3 text-dark-a0 rounded-lg hover:bg-primary-a0 hover:scale-110 transition-all shadow-lg font-bold"
            >
                View All Ebooks
            </Link>

            {/* Photo credit link to the image I used from Unsplash. May change to a different one later */}
            <div className="absolute bottom-6 text-surface-a50 text-xs opacity-70 hover:opacity-100 transition-opacity">
                Photo by <a
                href="https://unsplash.com/@ugur?utm_source=ebook_tracker&utm_medium=referral"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary-a0"
            >
                Ugur Akdemir
            </a> on <a
                href="https://unsplash.com/photos/assorted-book-lot-XT-o5O458as?utm_source=ebook_tracker&utm_medium=referral"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary-a0"
            >
                Unsplash
            </a>
            </div>
        </div>
    );
}
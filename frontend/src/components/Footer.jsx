
export default function Footer() {
    return (
        <footer className="bg-surface-a20 text-white p-6 border-t-2 border-surface-a50">
            <div className="grid grid-cols-3 items-center">

                <div></div>

                <div className="text-center">
                    <p className="text-md font-bold text-light-a0">
                        {new Date().getFullYear()} Kenneth
                    </p>
                </div>

                <div className="flex justify-end space-x-6 text-sm shrink-0">
                    <a
                        href="https://github.com/klavoie1/ebook-viewer"
                        target="_blank"
                        rel="noopener noreferrer"

                        className="hover:text-primary-a40 transition-colors"
                    >
                        GitHub
                    </a>
                </div>

            </div>
        </footer>
    );
}
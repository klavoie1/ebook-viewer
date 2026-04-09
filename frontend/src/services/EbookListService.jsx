const API_BASE_URL = "http://localhost:8080/ebookviewer";

export async function getEbookList() {
    const response = await fetch(`${API_BASE_URL}/ebook/all`, {});
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
}

export const getEbooksByGenre = async (genre) => {
    const response = await fetch(`http://localhost:8080/ebookviewer/ebook/genre/${genre}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch ebooks for genre: ${genre}`);
    }
    return await response.json();
};
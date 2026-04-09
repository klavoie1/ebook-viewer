const API_BASE_URL = "http://localhost:8080/ebookviewer";

export async function getEbookList() {
    const response = await fetch(`${API_BASE_URL}/ebook/all`, {});
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
}
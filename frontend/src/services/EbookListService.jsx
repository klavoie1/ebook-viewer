const API_BASE_URL = "http://localhost:8080/ebookviewer";

export async function getEbookList() {
    const response = await fetch(`${API_BASE_URL}/ebook/all`, {});
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
}

export const getEbooksByGenre = async (genre) => {
    const response = await fetch(`${API_BASE_URL}/ebook/genre/${genre}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch ebooks for genre: ${genre}`);
    }
    return await response.json();
};

export const findEbookListTotal = async () => {
    const response = await fetch(`${API_BASE_URL}/ebook`);
    if (!response.ok) {
        throw new Error("Failed to fetch total ebook count");
    }
    return await response.json();
};

export const getEbookById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/ebook/id/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch ebook with id: ${id}`);
    }
    return await response.json();
};

export const updateEbook = async (id, ebookData) => {
    const response = await fetch(`${API_BASE_URL}/ebook/id/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ebookData),
    });

    if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(`Failed to update ebook: ${errorMsg}`);
    }

    return await response.json();
};
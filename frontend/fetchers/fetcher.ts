
export async function fetcher<T>(input: RequestInfo | URL, init?: RequestInit) : Promise<T> {
    try {
        const response = await fetch(input, init);

        if (!response.ok) {
            throw new Error(`Fetch failed: ${response.status} ${response.statusText}`)
        }

        return response.json();
    } catch (error) {
        throw new Error(`Fetcher error: ${(error as Error).message}`);
    }
    
} 

export async function fetcher<T>(input: RequestInfo | URL, init?: RequestInit) : Promise<T> {
    try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;

        const headers = new Headers(init?.headers || {});
        if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
        if (token) headers.set('Authorization', `Bearer ${token}`);

        const response = await fetch(input, { ...init, headers }); 

        if (!response.ok) {
            throw new Error(`Fetch failed: ${response.status} ${response.statusText}`)
        }

        return response.json();
    } catch (error) {
        throw new Error(`Fetcher error: ${(error as Error).message}`);
    }
    
} 
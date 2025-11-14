
export async function fetcher<T>(input: RequestInfo | URL, init?: RequestInit) : Promise<T> {
    try {
        const headers = new Headers(init?.headers || {});
        if (!headers.has('Accept')) headers.set('Accept', 'application/json');

        const body = init?.body;
        const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
        if (!isFormData && body != null && !headers.has('Content-Type')) {
            headers.set('Content-Type', 'application/json');
        }

        const response = await fetch(input, {...init, headers, credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Fetch failed: ${response.status} ${response.statusText}`)
        }

        if (response.status === 204) return null as unknown as T;
        return await response.json();
    } catch (error) {
        throw new Error(`Fetcher error: ${(error as Error).message}`);
    }
    
} 
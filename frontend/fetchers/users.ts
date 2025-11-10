import { fetcher } from "./fetcher";

const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_URL


interface caretaker {
    user_id: string
    first_name: string
    last_name: string
    specialisation: string
    about_me: string
    tel_num: string
}

// interface searchCaretakersResponse {
//     caretakerList: Array<caretaker>
// }

export function searchCaretakers(query: string) {
    return fetcher<Array<caretaker>>(`${BACKEND_API}/users/caretakers/search?q=${encodeURIComponent(query)}`)
}
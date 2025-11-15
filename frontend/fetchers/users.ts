
import { fetcher } from "./fetcher";

const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_URL


interface caretaker {
    user_id: string
    first_name: string
    last_name: string
    academic_title: string
    help_categories: string[]
    user_image_url: string | null
    specialisation: string
    working_since: string
}

interface caretakerLong {
    user_id: string
    first_name: string
    last_name: string
    academic_title: string
    help_categories: string[]
    user_image_url: string | null
    specialisation: string
    about_me: string
    working_since: string
    tel_num: string
    office_address: string
}

// interface searchCaretakersResponse {
//     caretakerList: Array<caretaker>
// }

export function searchCaretakers(query: string) {
    return fetcher<Array<caretaker>>(`${BACKEND_API}/users/caretakers/search/?q=${encodeURIComponent(query)}`,  { credentials: "include" })
}

export function searchCaretakerById(query: string) {
    return fetcher<caretakerLong>(`${BACKEND_API}/users/caretakers/caretaker/${encodeURIComponent(query)}`)
}
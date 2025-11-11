## Backend
tu pišite kad dodate neki endpoint ili metodu za endpoint da imamo pregledno što smo napravili i da frontend može jasno vidjet što je napravljeno



API endpoints:

| **Endpoint** | **Definirane metode** | **Komentar(opcionalno)** |
|--------------|-------------------------|--------------------------------|
| /auth/login | POST | |
| /auth/register | POST |
| /auth/logout | POST |
| /auth/delete | DELETE |
| /auth/forgot-password | POST |
| /auth/reset-password/uidb64/token | POST |
| /users/caretakers/search | GET | searcha se putem queryja npr. **/users/caretakers/search?q=luka** za psihologa koji se zove/preziva luka, vraca **["user_id", "first_name", "last_name", "academic_title", "help_categories", "user_image_url", "specialisation", "working_since"]** |
| /caretakers/caretaker/id | GET | vraca **["user_id", "first_name", "last_name", "academic_title", "help_categories", "user_image_url", "specialisation", "about_me", "working_since", "tel_num", "office_address"]** |



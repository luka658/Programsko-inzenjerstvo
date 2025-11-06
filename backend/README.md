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
| /auth/reset-password/<uidb64>/<token> | POST |
| /users/caretakers/search | GET | searcha se putem queryja npr. **/users/caretakers/search?q=luka** za psihologa koji se zove/preziva luka |



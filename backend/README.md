## Backend
tu pišite kad dodate neki endpoint ili metodu za endpoint da imamo pregledno što smo napravili i da frontend može jasno vidjet što je napravljeno



API endpoints:

| **Endpoint** | **Definirane metode** | **Komentar(opcionalno)** |
|--------------|-------------------------|--------------------------------|
| /auth/login | POST | pogledaj dole** |
| /auth/register/caretaker | POST | primjer JSON-a koji treba poslati u POST requestu je dolje*  |
| /auth/register/student | POST |
| /auth/logout | POST |
| /auth/delete | DELETE |
| /auth/forgot-password | POST |
| /auth/reset-password/uidb64/token | POST |
| /users/caretakers/search | GET | searcha se putem queryja npr. **/users/caretakers/search?q=luka** za psihologa koji se zove/preziva luka, vraca **["user_id", "first_name", "last_name", "academic_title", "help_categories", "user_image_url", "specialisation", "working_since"]** |
| /caretakers/caretaker/id | GET | vraca **["user_id", "first_name", "last_name", "academic_title", "help_categories", "user_image_url", "specialisation", "about_me", "working_since", "tel_num", "office_address"]** |



*primjer JSON-a koji treba poslati u POST requestu
{
  "user": {
    "first_name": "Ivan",
    "last_name": "Ivić",
    "email": "ivan.ivic@example.com",
    "username": "ivanivic",      // opcionalno ovisno o pravilima, ali serializer očekuje polje
    "password": "secret123",
    "sex": "M",
    "age": 35
  },
  "specialisation": "Kognitivna terapija",
  "about_me": "Iskusni psiholog, radi s mladima.",
  "help_categories": [1, 2],   // ID-jevi postojećih kategorija
  "tel_num": "0911234567",
  "working_since": 2015,
  "office_address": "Ulica primjer 10, Grad",
  "user_image_url": "https://example.com/images/ivan.jpg",
  "academic_title": "dr"
}


**Json koji login vraca
{
    "user": {
        "id": 25,
        "email": "jozo@mail.com",
        "sex": "M",
        "age": 35,
        "username": "",
        "role": "caretaker"
    },
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc2MzU2NzExOSwiaWF0IjoxNzYyOTYyMzE5LCJqdGkiOiI2MjdiN2RjZjEzNjQ0ZWJlOGUyM2IyZTEzZjJjMjFjOCIsInVzZXJfaWQiOiIyNSJ9.hVOqybW7_VS_CepHYWUcBRo20pAfjDgQMAXdgq6e7yg",
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzYyOTYyNjE5LCJpYXQiOjE3NjI5NjIzMTksImp0aSI6IjU4OTViNDgzZThhNjQ2ZTY4ZWZiNDQzZThlZGExYTIxIiwidXNlcl9pZCI6IjI1In0.oVfwDqaZ5cGJxN_2qywTg4rf2_THHb-C7ydo4tHegQw"
}
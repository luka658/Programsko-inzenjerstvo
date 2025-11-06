# Programsko inženjerstvo ak.god 2025./2026.

##### Sveučilište u Zagrebu

##### Fakultet elektrotehnike i računarstva

# **CareFree**

**Tim: TG7.1**

* Luka Bubnjević
* Damjan Crnković
* Renato Dolić
* Ivan Draženović
* Ivan Dražetić
* Krešimir Kantolić
* Niko Kalle Zirdum

**Nastavnik: Saša Kendjel**

#### **Potencijalna korist projekta CareFree**

* CareFree je platforma koja studentima omogućuje jednostavan, anoniman i siguran pristup psihološkoj podršci putem AI-agenta i povezanih stručnjaka. Glavne koristi:

#### **Prednosti za studente**

- Brza i diskretna podrška: mogućnost započinjanja chata s AI-agentom i primanja sažetaka i preporuka bez izlaganja identiteta.
- Pristup stručnjacima: lako pronalaženje i rezerviranje termina s psihologom preporučenim prema problemu.
- Praćenje povijesti i napretka: pregled prethodnih razgovora, ocjena i internog feedbacka.

#### **Prednosti za psihologe / stručnjake**

- Bolji pristup klijentima: AI-agent filtrira i sažima probleme, pa psiholog dobiva informaciju o kontekstu prije razgovora.
- Upravljanje terminima: pregled zahtjeva i kalendara te mogućnost sinkronizacije s Google Calendarom.

#### **Postojeća slična rješenja**

* Na tržištu postoje rješenja i platforme za spajanje klijenata i terapeuta. CareFree se razlikuje po kombinaciji anonimnog AI-chata, automatske kategorizacije problema i preporuke psihologa koje su optimizirane za studente.

#### **Ključne razlike**

- Anonimnost i zaštita privatnosti korisnika.
- Integracija AI za sažimanje i kategorizaciju problema prije uključivanja stručnjaka.
- Fokus na brzoj preporuci psihologa i jednostavnom zakazivanju termina.

#### Skup korisnika koji bi mogao biti zainteresiran

- Studenti fakulteta i sveučilišta.
- Studentske službe i savjetovališta.
- Psiholozi i terapeuti koji pružaju online savjetovanje.
- Administratori i istraživači mentalnog zdravlja koji analiziraju agregirane, anonimizirane podatke.

#### Mogućnost prilagodbe rješenja

- Višejezičnost i lokalizacija sučelja.
- Povezivanje s različitim providerima autentikacije (Google OAuth) i kalendara (Google Calendar).
- Prilagodba ankete (pitanja i težine) i liste kategorija problema.

#### Opseg projektnog zadatka

- Frontend: Next.js (React) aplikacija za korisničke vieweve (moji razgovori, tražilica psihologa, profil, zahtjevi, trebam pomoć, registracija/login, kalendar, prikaz profila i popup za zakazivanje).
- Backend: Django REST API za korisnike, ankete, razgovore, poruke, zahtjeve i termine.
- Baza podataka: PostgreSQL (ili SQLite za lokalni razvoj) s tablicama prema modelu.
- AI-integracija: usluga koja prima anketu, klasificira problem i vraća sažetak i preporuke psihologa.
- Integracije: Google Calendar, e-mail (reset lozinke, notifikacije), OAuth za autentikaciju.

#### Moguće nadogradnje

- Mobilne aplikacije (iOS/Android).
- Napredne analize i agregirani dashboard za administratore.
- Dodatne metode autentikacije i dvoslojne provjere identiteta za psihologe.

### Funkcionalni zahtjevi

| ID    |                                                                           Opis | Prioritet | Kriterij prihvaćanja                                                            |
| ----- | -----------------------------------------------------------------------------: | --------: | -------------------------------------------------------------------------------- |
| F-001 |    Sustav omogućuje registraciju i prijavu korisnika (student/psiholog/admin) |    Visoki | Korisnik se može registrirati, potvrditi email (ako je postavljeno) i prijaviti |
| F-002 |       Student može započeti razgovor s AI-agentom i ispuniti početnu anketu |    Visoki | Anketa se pohranjuje, AI vraća kategoriju i sažetak                            |
| F-003 |             AI-agent preporučuje psihologe temeljem kategorije i preferencija |    Visoki | Prikazana su najmanje 3 preporučena profila                                     |
| F-004 |                  Student može pregledavati povijest razgovora (AI i psiholog) |   Srednji | Razgovori su dostupni u "Moji razgovori"                                         |
| F-005 | Student može inicirati zahtjev za razgovor sa psihologom i predložiti termin |    Visoki | Zahtjev stvara obavijest psihologu s anketom i sažetkom                         |
| F-006 |           Psiholog vidi zahtjeve, može prihvatiti/odbiti i predložiti termin |    Visoki | Status zahtjeva se ažurira i student dobiva obavijest                           |
| F-007 |   Chat između sudionika (poruke) traje unutar razgovora; poruke se pohranjuju |   Srednji | Poruke imaju vremenski pečat i referencu na razgovor                            |
| F-008 |             Sustav omogućuje povezivanje i sinkronizaciju s Google Calendarom |   Srednji | Termin sinkroniziran ima `google_kalendar_id`                                  |
| F-009 |                  Student može ocijeniti razgovor i ostaviti privatni komentar |   Srednji | Ocjena i komentar su pohranjeni, nisu javno prikazani                            |
| F-010 |         Administrator može upravljati korisnicima (suspendiranje, aktivacija) |    Visoki | Admin može promijeniti status korisnika                                         |

#### Ostali zahtjevi

- Reset lozinke putem e-maila.
- Vidljivost kontakta psihologa tek nakon početka razgovora (privatnost).

### Nefunkcijski zahtjevi

#### Zahtjevi performansi

| ID     |                                                                     Opis | Prioritet |
| ------ | -----------------------------------------------------------------------: | --------- |
| NF-1.1 | Stranica treba učitati unutar 2–3 sekunde na prosječnoj mrežnoj vezi | Visoki    |
| NF-1.2 |              Sustav mora podržavati najmanje 200 istovremenih korisnika | Visoki    |

#### Zahtjevi sigurnosti

| ID     |                                                                                                    Opis | Prioritet |
| ------ | ------------------------------------------------------------------------------------------------------: | --------- |
| NF-2.1 | Lozinke i osjetljivi podaci moraju biti šifrirani (Django User hash, dodatno bcrypt/argon2 po potrebi) | Visoki    |
| NF-2.2 |                                          Sustav mora imati zaštitu od SQL injection, XSS i CSRF napada | Visoki    |
| NF-2.3 |             Komunikacija mora koristiti HTTPS u produkciji; osjetljivi tokeni čuvati u env varijablama | Visoki    |

### Baza podataka (sažetak modela)

- KORISNIK (user_id PK, email, lozinka_hash, status, datum_registracije)
- STUDENT (user_id FK, fakultet, godina, anonimnost)
- PSIHOLOG (user_id FK, specijalizacija, godine_iskustva, titula, opis, adresa_ureda, preferirane_kategorije, slika_url, telefon)
- ANKETA (anketa_id PK, opis_problema, ozbiljnost_student, datum_ispune, kategorija_ai, sazetak_ai)
- ZAHTJEV (zahtjev_id PK, status, datum_kreiranja, fk_anketa, fk_student)
- RAZGOVOR (razgovor_id PK, vrsta, timestamp_pocetka, status, ocjena, komentar_studenta)
- PORUKA (poruka_id PK, razgovor_id FK, posiljatelj FK, sadrzaj, timestamp)
- TERMIN (termin_id PK, pocetak, kraj, google_kalendar_id, link, fk_psiholog, fk_zahtjev)

Profil psihologa

- Ime i prezime
- Kratki opis (3–5 rečenica)
- Titula
- Lokacija ureda
- Preference / kategorije
- Dostupnost (kalendar)
- Status aktivnosti
- Kontakt (email, telefon)

Struktura repozitorija

- `backend/` — Django REST API (models, serializers, views, urls)
- `backend/db.sqlite3` — primjer lokalne baze (dev)
- `frontend/` — Next.js aplikacija (app dir, components, UI)

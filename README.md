# CareFree - psihološka pomoć na dlanu
Projekt ima za cilj pružiti studentima siguran digitalni prostor za izražavanje i
brzu, diskretnu psihološku podršku i spajanje sa stručnjakom.

Naglasak je na sigurnosti, anonimnosti i jednostavnosti korištenja. Ova aplikacija
nastoji smanjiti jaz između studenta i psihologa i olakšava studentima postupak
pronalaska osobe za psihološko savjetovanje.

## Motivacija i opis aplikacije
Sve veći broj studenata suočava se s problemima mentalnog zdravlja, ali zbog
stigme, troškova ili nedostatka vremena često ne traže stručnu pomoć.

Cilj projekta je izraditi web aplikaciju za digitalnu podršku mentalnom zdravlju
studenata, koja omogućuje anoniman razgovor s AI chatbotom, vođenje osobnog
dnevnika raspoloženja i povezivanje s psihologom putem online platforme i
mogućnost zakazivanja termina za savjetovanje. Studenti nakon razgovora ostavljaju
feedback, i o svojim osjećajima i o kvaliteti psihologa. Tako studenti mogu pratiti svoj
osobni napredak, a chatbot može davati bolje preporuke drugim studentima kako bi
dobili psihologa koji im bolje odgovara. Također, psiholozi mogu dobiti korisnu
povratnu informaciju. Naravno, svi podaci su anonimizirani kako bi identitet korisnika
ostao zaštićen.

Sustav ima tri uloge:
 - Student - komunicira s AI chatbotom i objašnjava probleme i izazove s kojima
se susreće.
 - Psiholog - povezuje se sa studentom na temelju studentovog razgovora s AI
chatbotom i savjetuje studenta i po potrebi dogovara sastanak.
 - Administrator - odobrava nove psihologe i nadgleda ostale korisnike (npr. po
potrebi onemogućuje daljnji rad psihologu ili suspendira korisnički račun
studentu u slučaju kršenja smjernica). 

## Tehničke specifikacije
Aplikacija koristi Next.js (Tailwind + Shadcn/UI) na frontendu, Django na
backendu, PostgreSQL bazu (s dodatkom pgvector), te integracije s LangChainom,
Google Calendarom, Gmailom, OAuth (Google) autentifikacijom i Google Mapsom.




Projekt iz predmeta Programsko inženjerstvo na FER-u, 2025.

Grupa - G07.1

Luka Bubnjević, Renato Dolić, Ivan Dražetić, Ivan Draženović, Niko Kalle Zirdum,
Damjan Crnković, Krešimir Kantolić.

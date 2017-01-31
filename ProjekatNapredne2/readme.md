# MongoDB i Mongoose

Aplikacija je jednostavan REST back end za projekat

## API

* `GET api/` - pocetna stranica sajta **
* `POST api/login/` - logovanje vec postojec korisnika **
* `POST api/user/` - registracija novog korisnika *
* `DELETE api/user/:id` - brisanje odredjenog korisnika po id **
* `GET api/users/all` - prikaz svih korisnika *|*
* `POST api/aplication` - dodavanje nove aplikacije **
* `GET api/:domen` - prikaz podataka odredjene aplikacije **
* `PUT api/:domen/user` - dodavanje novog odgovornog korisnika za datu aplikaciju **
* `POST api/:domen/error` - hvatanje greske sa odredjene aplikacije *




## Struktura aplikacije

U folderu `app/model` nalaze se modeli.


## Pokretanje aplikacije

1. pokrenuti `npm install`
2. pokrenuti `npm install express`
3. pokrenuti `npm install mongoose`
4. pokrenuti `npm install nodemailer`
5. pokrenuti MongoDB u lokalu
6. pokretati aplikacije pomoću `node server.js`
7. Instalirati `npm install nodemailer@0.7.1 --save`
8. install `npm install nodemailer-smtp-transport`
9. install `npm install body-parser`

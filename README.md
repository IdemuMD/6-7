# 6-7 Pets

6-7 Pets er en nettside for å holde oversikt over kjæledyr, eiere og veterinærer. Nettsiden er laget med Node.js, Express, MongoDB, Mongoose og EJS.

## Hvordan bruke nettsiden

Start prosjektet med:

```bash
npm install
npm start
```

Åpne deretter:

```text
http://localhost:3000
```

Før nettsiden startes må `.env` ligge i prosjektmappen:

```env
MONGO_URI=mongodb://10.12.2.144:27017/6-7?directConnection=true
PORT=3000
SESSION_SECRET=6-7-pets-local-secret
```

## Brukertyper

Nettsiden har to typer brukere:

- Eier
- Veterinær

Eiere og veterinærer opprettes ved å lage en ny bruker på registreringssiden. Passord lagres ikke som vanlig tekst, men hashes med bcrypt.

## For eiere

En eier kan:

- opprette en ny brukerkonto
- logge inn
- se sin egen side
- legge til sitt eget kjæledyr
- velge veterinær for kjæledyret
- se hvilke kjæledyr de har registrert

Når en eier legger til et kjæledyr, blir kjæledyret automatisk koblet til eierens egen bruker. Eier kan ikke slette kjæledyr eller slette sin egen konto.

## For veterinærer

En veterinær kan:

- opprette en ny brukerkonto
- logge inn
- se sin egen side
- se kjæledyr som er tildelt dem
- se eiere, veterinærer og kjæledyr
- slette kjæledyr eller brukere hvis det trengs

Veterinærer brukes som administrerende rolle i systemet.

## FAQ

### Hvordan lager jeg en ny eier?

Gå til `Ny bruker`, velg `Eier`, fyll inn navn, e-post, passord, telefon og adresse, og trykk `Opprett bruker`.

### Hvordan lager jeg en ny veterinær?

Gå til `Ny bruker`, velg `Veterinær`, fyll inn navn, e-post, passord, telefon og spesialisering, og trykk `Opprett bruker`.

### Hvordan logger jeg inn?

Gå til `Logg inn`, velg om du er eier eller veterinær, og skriv inn e-post og passord.

### Hvordan legger en eier til et kjæledyr?

Eieren må først logge inn. Etter innlogging går eieren til `Min side` og trykker `Legg til kjæledyr`. Der fylles navn, art, rase og alder inn. Eieren velger også hvilken veterinær kjæledyret skal ha.

### Kan man legge til kjæledyr uten å logge inn?

Nei. Man må være logget inn for å legge til et kjæledyr.

### Kan eiere slette kjæledyr?

Nei. Eiere kan registrere kjæledyr, men de kan ikke slette dem.

### Kan eiere slette sin egen konto?

Nei. Eiere kan ikke slette sin egen konto.

### Hvem kan slette kjæledyr og brukere?

Veterinærer kan slette kjæledyr og brukere. Dette gjør veterinærrollen til en enkel admin-rolle.

### Hvorfor brukes ObjectId?

MongoDB gir hvert dokument en unik `_id`. Kjæledyr bruker `eierId` for å peke på eieren sin og `veterinaerId` for å peke på veterinæren sin. Dette gjør at ett kjæledyr kan kobles til riktig eier og riktig veterinær.

### Hva gjør populate?

`populate()` brukes for å hente hele eier- og veterinærdokumentet når kjæledyr vises. Da kan nettsiden vise navn på eier og veterinær i stedet for bare ObjectId.

### Hvorfor brukes EJS?

EJS brukes for å lage HTML på serveren. Det betyr at Express henter data fra MongoDB, sender dataene til en EJS-fil, og EJS lager ferdig HTML som vises i nettleseren.

### Hvordan er dataflyten?

Dataflyten er:

```text
Nettleser -> Express route -> Controller -> MongoDB/Mongoose -> EJS view -> Nettleser
```

### Hvilke collections brukes i databasen?

Prosjektet bruker disse MongoDB-collectionene:

- `eiere`
- `veterinaerer`
- `kjaeledyr`

### Hvilke relasjoner finnes?

`kjaeledyr.eierId` peker til `_id` i `eiere`.

`kjaeledyr.veterinaerId` peker til `_id` i `veterinaerer`.

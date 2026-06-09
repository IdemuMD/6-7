# 6-7 Pets

MVC-style Express application for a Vg2 IT exam project.

## Tech stack

- Node.js
- Express
- MongoDB with Mongoose
- EJS server-rendered views

## Run

1. Copy `.env.example` to `.env`.
2. Set `MONGO_URI` to the existing MongoDB database, for example `mongodb://10.12.2.144:27017/6-7`.
3. Run:

```bash
npm install
npm start
```

Open `http://localhost:3000`.

## Pages

- `/pets`
- `/owners`
- `/veterinarians`

Each page supports list, create, edit and delete.

## Data flow

Browser -> Express route -> Controller -> MongoDB through Mongoose -> EJS render -> Browser.

EJS replaces a frontend framework by rendering HTML on the server. The browser receives finished HTML pages instead of building the interface with React or another frontend framework.

## Relationships

`Pet` documents use ObjectId fields:

- `eierId` points to an owner document in `eiere`
- `veterinaerId` points to a veterinarian document in `veterinaerer`

ObjectId is used because every MongoDB document has a unique `_id`. Mongoose `populate()` follows those ids and loads the full related owner/veterinarian documents for display.

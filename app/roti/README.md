# ROTI

Return On Time Investment

## URLs

## SPA - Single Page App

- Server-side : REST API
- Client-side : HTML generation

Standard REST API:

```
GET     /rest/rotis         Array<{ title, note }>
GET     /rest/rotis/:id     { title, note }
POST    /rest/rotis
DELETE  /rest/rotis/:id
DELETE  /rest/rotis
PUT     /rest/rotis/:id     { title, note }
PATCH   /rest/rotis/:id     { title?, note? }

…
```

## HTML generation

- home.html
- roti.html
- new-roti.html

```
GET     /                      (home)
POST    /login                 (authentication)
GET     /roti/:id              (page d'une réunion)
POST    /roti/:id/feedback     (ajout d'un feedback)
GET     /new-roti              (formulaire d'ajout)
POST    /new-roti              (ajout d'un roti)
```

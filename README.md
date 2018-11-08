# Project Name

ImaginApp.

## Description

Web Application to record (voice) or write your speeches and explore other's speeches. You can also hear yours, or other speeches. 

## User Stories

-  **404:** As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault. 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.
- **homepage** - As a user I want to be able to access the homepage so i can sign in or log in.
- **sign up** - As a user I want to sign up on the webpage so that I can practice my speeches and read others speeches for inspiration.
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account.
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account.
- **speeches list** - As a user I want to see all the speeches available so that I can choose which ones I want to access.
-  **search speeches** As a user I want to search speeches using tags.
-  **create speeches** As a user I want to practice my speeches, so i want to record or write them.
-  **public/private speeches** As a user I want to keep private my speeches, or share them.
- **read my speeches** As a user i want to read or listen my own speeches.
-  **edit my speeches** As a user I want to edit my speeches, so i can modify them.
-  **delete speeches** As a user I want to delete my speeches.
-  **add to favorites** As a user I want to add speeches to favorite so that I can save the ones that I liked the most.
-  **see my favorites** As a user I want to see my favorite speeches so that I can see the ones I liked the most.
- **profile** - As a user I want to check my profile and edit it.

## Backlog


- see other users profiles.
- check favourites.
- upload pictures. 
- search users.
- add comments to speeches.
- censurator. 
- chat room.
- upload audio files to transcribe to text.
  
# Client

## Routes

- / - Homepage   - Sign Up / Log In. y
- /auth/signup - Signup form. y
- /auth/login - Login form. y

- /speeches - Speeches list. y
- /speeches/:id - Speech detail. y
- 

- /profile  -  Shows user profile. y
- /profile/edit  -  Edit profile.<> y
- /profile/speeches - Shows user speeches (delete and create options). y
- /profile/speeches/new  - Create Form. y
- /profile/speeches/:id/edit  -  Edit Form user speeches.

- /profile/favourites - Show favourite speeches. y
- 404

## Pages

- Home Page  (Shows Sign In / Log In options)
- Sign up Page 
- Log in Page 

- Search Speeches Page
- Detail Page

- My Profile Page (with Edit Options)
- Own Speeches List Page 
- Speeches Create 
- Edit own Speeches Page (Detail too)

- Favourite List Page (Redirects for detail to : Detail Page)
- 404 Page 
- 500 Page

## Components

- ...........
  - Props:
  - State:
- Search component
  - Props:
  - State:

## IO


## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- Speeches Service
  - speeches.list()
  - speeches.create(data)
  - speeches.detail(id)
  - speeches.addFavorite(id)
  - speeches.removeFavorite(id)   
- Profile Service

# Server

## Models

User model

```
username - String // required & unique
email - String // required & unique
picture - String
password - String // required
favorites - [ObjectID<Speeches>]
```

Speeches model

```
owner - ObjectID<User> // required
title - String // required
message - String
tag - [String]
private - Boolean
```

## API Endpoints/Backend Routes

**Auth**
- GET /auth/me
- POST /auth/signup
  - body:
    - username
    - email
    - password
- POST /auth/login
  - body:
    - username
    - password
- POST /auth/logout
  - body: (empty)

**Speeches**
- GET /speeches                     Dependiendo de los resultados mostrará de una forma u otra. Para de propio usuario hay que realizar Query.
- POST /speeches                    Crear speeches.
- GET /speeches/:id                 Detalle speech. Dependiendo de si currentUser === owner._id mostrará una cosa u otra. 
- PUT /speeches/:id                 Edita su propio speech. 
- DELETE /speeches/:id              Eliminar speech.
- POST /speeches/:id/favourites     Añade a favoritos.

<!-- **Profile** (User)
- GET  /profile       Nuestro perfil.
- PUT  /profile       Edita perfil.
- GET  /profile/me/speeches/        Listar nuestros speeches.
- POST /profile/me/speeches/        Crear speech.
- GET  /profile/me/speeches/:id     Detalle de un speech nuestro.
- PUT  /profile/me/speeches/:id     Editar un speech. nuestro.
- DELETE /profile/me/speeches/:id
  - body: (empty)
- GET /profile/me/favorites         Ver favoritos. 
- DELETE /profile/me/favorites/:id  Eliminar de favoritos. -->

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/vdLva9oe/imaginapp) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](http://github.com)
[Server repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)

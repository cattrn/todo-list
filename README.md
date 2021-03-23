![contributor shield](https://img.shields.io/github/contributors/cattrn/todoli?style=for-the-badge)
![license shield](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
[![heroku shield](https://img.shields.io/badge/Heroku-todoli--app-%2379589F?style=for-the-badge)](https://todoli-app.herokuapp.com/)

# Todoli

A simple to do app that prioritises ease of use. Includes a view for today's tasks, all tasks, the ability to add one-off and recurring tasks, the ability to complete a task without removing it from view, and the ability to set when tasks reset for the following day.

## To Do
- [ ] POST routes for adding tasks and editing tasks
- [ ] Recurring tasks
- [ ] Radio button styling
- [ ] Password reset
- [ ] Allow users to change what time tasks reset

## Demo 
[![heroku shield](https://img.shields.io/badge/Heroku-todoli--app-%2379589F?style=for-the-badge)](https://todoli-app.herokuapp.com/)

## Technologies/Frameworks used:

- HTML, CSS, JavaScript, JQuery
- Node, Express, EJS
- PostgreSQL
- SendGrid

## Installation

Download or clone the repo and run the following in the same folder.

```zsh
npm install
```

## Getting Started

### 1. Create .env file

```
PORT=YOUR_PORT_NUMBER

POSTGRES_PORT=YOUR_POSTGRESQL_PORT
POSTGRES_DATABASE="todo"
POSTGRES_USERNAME="your_postgresql_username"
POSTGRES_PASSWORD="your_postgresql_password"

SENDGRID_API_KEY = "your_sendgrid_api_key"
```

### 2. Open PostgreSQL and run the following scripts

This will create the database, create tables, and seed the tables.

```zsh
npm run create_database
```

```zsh
npm run create_tables
```

```zsh
npm run seed_users
```

### 3. Start up the app

```zsh
npm run dev
```

## Credits
Todoli uses assets from Font Awesome and Google Fonts.

## License 
![license shield](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## Acknowledgements

- Harry Aydin
- INCO Academy
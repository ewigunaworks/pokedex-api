# POKEDEX API APP
This Pokedex API Apps is a simple CRUD that using NodeJS, ExpressJS, JWT Authentication, and PostgreSQL. To be able to use this apps, user must register first as admin or user. As an admin, we can do the CRUD of monster, user-role, user module. Also as an user, we can do the register user, get list of monster, get detail of monster, and catch/release the monster.
For the list and the detail of the monster, we can authenticate as user or not authenticate as guest, but when we need to catch the monster, we need to login as user.
## GETTING STARTED
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

##### PREQUISITES
What things you need to install the software and how to install them
```
https://nodejs.org/en/docs/guides/
```

##### INSTALLING
A step by step series of examples that tell you how to get a development env running
* Download/clone the Pokedex API Apps
    ```
    https://github.com/ewigunaworks/pokedex-api
    ```
* Copy or replace the .env.example to .env, or add new .env
* Create new Database
* Run the migration, use the following command
    ```
        npm run db:migrate
    ```
* Run the seeder, use the following command
    ```
        npm run db:seed:all
    ```
* Install the dependencies, use the following command
    ```
        npm install
    ```
* Then use the following command to run it
    ```
        npm run start or npm run start-dev
    ```

### RUNNING THE APPS
Currently there are no automated tests for this apps but you can use the following endpoints to test the apps
* [API SPEC.md](https://github.com/ewigunaworks/pokedex-api/blob/master/api-spec.md)

### BUILT WITH
* [NodeJS](https://nodejs.org/) - An open-source, cross-platform JavaScript runtime environment
* [ExpressJS](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
* [Sequelize](https://sequelize.org/) - A modern TypeScript and Node.js ORM
* [PostgreSQL](https://sequelize.org/) - A powerful, open source object-relational database system
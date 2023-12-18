# Welcome to the Inventory Manager Suite

This app was created by Trevor Jones, using JavaScript, HTML, and CSS languages, with the React, Express, Knex, and Postgres packages.

## Setup
1. Install WSL 2:
    ```bash
    wsl.exe --install
    ```

2. Install Docker Desktop:
    [Docker Desktop Installation Guide](https://docs.docker.com/desktop/install/windows-install/)

3. Pull Postgres Image into your system:
    ```bash
    docker pull postgres
    ```

4. Create a directory for Postgres data:
    ```bash
    mkdir -p $HOME/docker/volumes/postgres
    ```

5. Create and run Postgres Image:
    ```bash
    docker run --name data -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
    ```

6. Log into Postgres image:
    ```bash
    docker exec -it data psql -U postgres -h localhost -W
    ```

7. In Postgres terminal, create a database:
    ```sql
    CREATE DATABASE database;
    ```
    Verify with:
    ```sql
    \list;
    ```
    Log into the database:
    ```sql
    \c database
    ```

## Application Setup
1. Fork and Clone this repository.

2. Change to Server or Client directory:
    ```bash
    cd server
    ```
    or
    ```bash
    cd client
    ```

3. Install required packages:
    ```bash
    npm install
    ```

4. For Server, run migrations and seed data:
    ```bash
    npx knex migrate:latest
    npx knex seed:run
    ```

5. Start the Server and the Client:
    ```bash
    npm start
    ```

6. Open in your browser:
    - [http://localhost:3000](http://localhost:3000) for the Client App
    - [http://localhost:8080](http://localhost:8080) to view the Server

For any issues, contact Trevor at trevor.jones.23@spaceforce.mil or on GitHub @TrevaTheRuiner

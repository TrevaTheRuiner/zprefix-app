# Welcome to the Inventory Manager Suite

This app was created by Trevor Jones, with Javascript, HTML and CSS languages, using the React, Express, Knex, and Postgres packages.

## Setup
-----------------------------
First you will need a few things to get this setup. You will need WSL 2 installed in your terminal.
  ### wsl.exe --install

Next, you will need to install Docker Desktop
### [https://docs.docker.com/desktop/install/windows-install/]

Next, to get Docker started, you need to install the Postgres Image. You can pull that into your system with the following
commands in your Root directory of your terminal:

### docker pull postgres

Next, you will create a directory in your system by using the following command:

###  mkdir -p $HOME/docker/volumes/postgres

Next, you will create a postgres Image on your docker now that you have created a directory and installed postgres:

###  docker run --name data -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

Next, you will log into this Postgres image using the following and log in with your password 'docker':

###  docker exec -it data psql -U postgres -h localhost -W

Lastly, once in Postgres in the terminal you will need to create a database:

### CREATE DATABASE database;

From here, you can type '\list;' to verify your database called 'database' is created.
If you ever want to view or modify the database (not required) you can type the following to log into this database:

\c database


-------------------------------------------------------
-------------------------------------------------------

Next, the following code will get your terminal setup to run the application.

## Scripts
------------------------------
Fork and Clone this directory:
First you will need to click the 'Fork' button on Github to create your own version of this repository.
Next, you will clone the directory by typing the following into your terminal, or by copying the 'Clone' link 
on Github on your Forked Repo.
git@github.com:{insert your username here}/zprefix-app.git

-----------------------------
After cloning this directiory, you can run the following commands to get the project setup on your machine:
### cd server   
### cd client

This will move you into the Server or Client directories, so that you can install the packages for each
or run commands from the Server or Client.

You can type 
### cd ..
to naviate backwards into the previous, higher directory.
-----------------------------
### npm install

Run this command once you are inside the Server, and again once you are inside the Client, directories.
This will install all required packages, such as React, Express, Knex, and Postgres packages.

-----------------------------
Navigate into your Server by typing
### cd server

### npx knex migrate:latest
### npx knex seed:run 

You will need to run this command in the Server directory to build your tables and seeded-default data into your Docker Database.
-----------------------------
### npm start

Run this command once you are in each directory, to start the Server and the Client App.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser and run the App
Open [http://localhost:8080](http://localhost:8080) if you want to see the Server in a browser.

-----------------------------

Great! This should get you started so you can start exploring this project.
For any issues, contact Trevor at trevor.jones.23@spaceforce.mil or on GitHub @TrevaTheRuiner

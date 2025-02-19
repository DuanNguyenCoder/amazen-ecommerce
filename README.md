## AMAZEN

Amazen web application using Angular | Node.js | Express.js | MongoDB (MEAN Stack)

## 🚀 Features

- Node provides the backend environment for this application
- Express middleware is used to handle requests, routes
- Implements JWT (JSON Web Tokens) for user authentication and session management.
- Mongoose schemas to model the application data
- Amazon AWS-S3 for secure and reliable image hosting.
- Stripe Payment for seamless online transactions.
- Algolia Search for fast and accurate search functionality.
- Docker for containerized applications, ensuring consistency across environments.

## 📌 Tech Stack

| Area                 | Technology                                   |
| -------------------- | -------------------------------------------- |
| **Front-End**        | Angular, Bootstrap, Tailwind css, TypeScript |
| **Back-End**         | Express, Node.js                             |
| **Authentication**   | JWT (JSON Web Tokens)                        |
| **API Testing**      | Postman                                      |
| **Database**         | MongoDB (Mlab Cloud Service)                 |
| **Images Storage**   | Amazon AWS-S3                                |
| **Other APIs Used**  | Stripe Payment, Algolia Search               |
| **Containerization** | Docker                                       |

## Install

```bash
git clone https://github.com/DuanNguyenCoder/amazen-ecommerce.git
cd project
cd client/Angularecommerce
npm install
cd server
npm install
```

## Docker Guide

To run this project locally you can use docker compose provided in the repository. Here is a guide on how to run this project locally using docker compose.Clone the repository

To clone this repository, use the following command:

```bash
git clone https://github.com/DuanNguyenCoder/amazen-ecommerce.git
```

Edit the dockercompose.yml file

```bash
environment:
- database=mongodb://root:root@mongodb:27017/ecommerce?authSource=admin
- secret= enter JWT secret
- accessKey= enter your aws s3 accessKey
- secretKey= enter your aws s3 secretKey
- bucket= enter your aws s3 bucket
```

Then simply start the docker compose:

```bash
docker-compose build
docker-compose up
```

After launching the project, it will automatically create some fake data from the seed file, including an admin account, and you can use that account to log in to the project.

```bash
Email: admin
Passwords: admi
```

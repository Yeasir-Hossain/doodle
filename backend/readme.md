# Project Initialization and Setup

### This project serves as the backend for a web application. It utilizes Node.js, Express, Prisma, and other dependencies to provide a robust and scalable backend infrastructure.

- At first run 
```bash
npm install
```
- Then start prisma
```bash
npm run prisma
```
- To run
```bash
npm run dev
```

## Problems Faced

During the development process, a significant challenge arose when attempting to utilize SQL with the `mysql2` package. Issues were encountered while making queries due to a lack of implementation for SQL in Express.

## Solutions Implemented

To overcome the challenges associated with `sql`, decision was made to switch to Prisma and PostgreSQL. This transition was facilitated by prior experience working on a project with this stack, providing a more comfortable and reliable solution for SQL integration within Express.
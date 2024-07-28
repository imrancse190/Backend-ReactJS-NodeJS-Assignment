# Hotel Management System Backend

## Assignment on NodeJS, ReactJS, PostgresSQL

This project is a backend application for managing hotel and room details using Node.js, Express.js, and PostgreSQL.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [Hotel Endpoints](#hotel-endpoints)
  - [Room Endpoints](#room-endpoints)
- [Database Schema](#database-schema)
- [Additional Information](#additional-information)

## Getting Started

Follow these instructions to set up and run the project on your local machine.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/imrancse190/hotel-management-backend.git
   cd hotel-management-backend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up the PostgreSQL database:**

   - Create a new PostgreSQL database:

     ```sql
     CREATE DATABASE hotel_management;
     ```

   - Update the database configuration in `db.js`:

     ```javascript
     const pool = new Pool({
       user: "your_db_user",
       host: "localhost",
       database: "hotel_management",
       password: "your_db_password",
       port: 5432,
     });
     ```

4. **Run database migrations:**

   Use a migration tool like [knex](http://knexjs.org/) or run the SQL scripts manually to create tables:

   ```sql
   CREATE TABLE hotels (
       slug VARCHAR(255) PRIMARY KEY,
       images TEXT[],
       title VARCHAR(255) NOT NULL,
       description TEXT,
       guest_count INTEGER,
       bedroom_count INTEGER,
       bathroom_count INTEGER,
       amenities TEXT[],
       host_information TEXT,
       address TEXT,
       latitude DOUBLE PRECISION,
       longitude DOUBLE PRECISION
   );

   CREATE TABLE rooms (
       hotel_slug VARCHAR(255) REFERENCES hotels(slug) ON DELETE CASCADE,
       room_slug VARCHAR(255) PRIMARY KEY,
       room_image TEXT,
       room_title VARCHAR(255),
       bedroom_count INTEGER
   );
   ```

## Running the Application

1. **Start the server:**

   ```sh
   npm start
   ```

2. **The server will run on `http://localhost:3000`.**

## API Endpoints

### Hotel Endpoints

- **Create a hotel**

  - **URL:** `POST /hotel`
  - **Body:**

    - Note: I have chosen to use image names rather than full image URLs. Detecting and managing separate URLs for each image when posting data from the backend/postman is challenging. If I get the opportunity to handle data posting from the frontend, I will definitely address this. If I am mistaken in my approach, I would be grateful to learn the proper method.

  ```json
  {
    "images": ["./assets/images/bedroom3.jpg", "./assets/images/bedroom2.jpg","./assets/images/bedroom1.jpg","./assets/images/bedroom5.jpg","./assets/images/bedroom6.jpg","./assets/images/bedroom4.jpg","./assets/images/bedroom7.jpg","./assets/images/bedroom9.jpg","./assets/images/bedroom8.jpg"],
    "title": "Grand Plaza Hotel",
    "description": "Experience the grandeur of the city with a luxurious stay at the Grand Plaza Hotel. Perfect for business and leisure travelers.",
    "guest_count": 3,
    "bedroom_count": 1,
    "bathroom_count": 1,
    "amenities": ["Free WiFi", "Breakfast included", "Gym"],
    "host_information": "Alice Smith, +1987654321, alice.smith@example.com",
    "address": "456 Elm St, Townsville, Country",
    "latitude": 34.0522,
    "longitude": -118.2437
  }
  ```

  ```json
    {
      "images": ["./assets/images/bedroom5.jpg", "./assets/images/bedroom1.jpg","./assets/images/bedroom2.jpg","./assets/images/bedroom3.jpg","./assets/images/bedroom9.jpg","./assets/images/bedroom7.jpg","./assets/images/bedroom4.jpg","./assets/images/bedroom8.jpg","./assets/images/bedroom6.jpg"],
      "title": "Ocean View Resort",
      "description": "Relax and unwind at the Ocean View Resort. Enjoy stunning sea views, top-notch amenities, and unparalleled service.",
      "guest_count": 5,
      "bedroom_count": 3,
      "bathroom_count": 2,
      "amenities": ["Free WiFi", "Sea View", "Spa"],
      "host_information": "Bob Johnson, +1098765432, bob.johnson@example.com",
      "address": "789 Sea Rd, Beachside, Country",
      "latitude": 36.1699,
      "longitude": -115.1398
    }
  ```

- **Get all hotels**

  - **URL:** `GET /hotel/`
  - **Response:**
    ```json
    [
      {
        "address": "123 Main St, Cityville, Country",
        "images": [
          "./assets/images/bedroom1.jpg",
          "./assets/images/bedroom2.jpg",
          "./assets/images/bedroom3.jpg",
          "./assets/images/bedroom4.jpg",
          "./assets/images/bedroom5.jpg",
          "./assets/images/bedroom6.jpg",
          "./assets/images/bedroom7.jpg",
          "./assets/images/bedroom8.jpg",
          "./assets/images/bedroom9.jpg"
        ],
        "host_information": "John Doe, +1234567890, john.doe@example.com",
        "slug": "redisson-blu-hotel-1"
      },
      {
        "address": "456 Elm St, Townsville, Country",
        "images": [
          "./assets/images/bedroom3.jpg",
          "./assets/images/bedroom2.jpg",
          "./assets/images/bedroom1.jpg",
          "./assets/images/bedroom5.jpg",
          "./assets/images/bedroom6.jpg",
          "./assets/images/bedroom4.jpg",
          "./assets/images/bedroom7.jpg",
          "./assets/images/bedroom9.jpg",
          "./assets/images/bedroom8.jpg"
        ],
        "host_information": "Alice Smith, +1987654321, alice.smith@example.com",
        "slug": "grand-plaza-hotel"
      }
    ]
    ```

- **Get a hotel**

  - **URL:** `GET /hotel/:slug`
  - **Response:**
    ```json
    {
      "status": 200,
      "data": {
         {
          "address": "123 Main St, Cityville, Country",
          "images": [
            "./assets/images/bedroom1.jpg",
            "./assets/images/bedroom2.jpg",
            "./assets/images/bedroom3.jpg",
            "./assets/images/bedroom4.jpg",
            "./assets/images/bedroom5.jpg",
            "./assets/images/bedroom6.jpg",
            "./assets/images/bedroom7.jpg",
            "./assets/images/bedroom8.jpg",
            "./assets/images/bedroom9.jpg"
          ],
          "host_information": "John Doe, +1234567890, john.doe@example.com",
          "slug": "redisson-blu-hotel-1"
        }
      }
    }
    ```

- **Update a hotel**

  - **URL:** `PUT /hotel/:slug`
  - **Body:** (similar to create)
  - **Response:**
    ```json
    {
      "status": 200,
      "message": "Hotel updated successfully"
    }
    ```

- **Delete a hotel**
  - **URL:** `DELETE /hotel/:slug`
  - **Response:**
    ```json
    {
      "status": 200,
      "message": "Hotel deleted successfully"
    }
    ```

### Room Endpoints

- **Create a room**

  - **URL:** `POST /hotel/:hotel_slug/room`
  - **Body:**
    ```json
    {
      "room_image": "room1.jpg",
      "room_title": "Deluxe Room",
      "bedroom_count": 1
    }
    ```

- **Get a room**

  - **URL:** `GET /hotel/:hotel_slug/room/:room_slug`
  - **Response:**
    ```json
    {
      "status": 200,
      "data": {
        "hotel_slug": "redisson-blu",
        "room_image": "room1.jpg",
        "room_title": "Deluxe Room",
        "bedroom_count": 1
      }
    }
    ```

- **Update a room**

  - **URL:** `PUT /hotel/:hotel_slug/room/:room_slug`
  - **Body:** (similar to create)
  - **Response:**
    ```json
    {
      "status": 200,
      "message": "Room updated successfully"
    }
    ```

- **Delete a room**
  - **URL:** `DELETE /hotel/:hotel_slug/room/:room_slug`
  - **Response:**
    ```json
    {
      "status": 200,
      "message": "Room deleted successfully"
    }
    ```

## Database Schema

### Hotels Table

```sql
CREATE TABLE hotels (
    slug VARCHAR(255) PRIMARY KEY,
    images TEXT[],
    title VARCHAR(255) NOT NULL,
    description TEXT,
    guest_count INTEGER,
    bedroom_count INTEGER,
    bathroom_count INTEGER,
    amenities TEXT[],
    host_information TEXT,
    address TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION
);
```

### Rooms Table

```sql
CREATE TABLE rooms (
    hotel_slug VARCHAR(255) REFERENCES hotels(slug) ON DELETE CASCADE,
    room_slug VARCHAR(255) PRIMARY KEY,
    room_image TEXT,
    room_title VARCHAR(255),
    bedroom_count INTEGER
);
```

## Additional Information

For any questions or issues, feel free to open an issue in the repository.

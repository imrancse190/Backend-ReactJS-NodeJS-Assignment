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

- [Node.js](https://nodejs.org/) (v14.x or later)
- [PostgreSQL](https://www.postgresql.org/) (v12.x or later)

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

   - Update the database configuration in `controllers/hotelController.js`:

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

    - Note: I have chosen to use image names rather than full image URLs. Detecting and managing separate URLs for each image when posting data from the backend is challenging. If I get the opportunity to handle data posting from the frontend, I will definitely address this. If I am mistaken in my approach, I would be grateful to learn the proper method.

    ```json
    {
      "slug": "redisson-blu",
      "images": ["bedroom3.jpg", "bedroom4.jpg"],
      "title": "Redisson Blu Hotel",
      "description": "A luxurious stay in the heart of the city.",
      "guest_count": 4,
      "bedroom_count": 2,
      "bathroom_count": 1,
      "amenities": ["Free WiFi", "Breakfast included", "Swimming Pool"],
      "host_information": "John Doe, +1234567890, john.doe@example.com",
      "address": "123 Main St, Cityville, Country",
      "latitude": 40.7128,
      "longitude": -74.006
    }
    ```

- **Get all hotel**

  - **URL:** `GET /hotel/`
  - **Response:**
    ```json
    [
      {
        "address": "456 Elm St, Townsville, Country",
        "images": [
          "bedroom1.jpg",
          "bedroom2.jpg",
          "bedroom3.jpg",
          "bedroom4.jpg",
          "bedroom5.jpg",
          "bedroom6.jpg",
          "bedroom7.jpg",
          "bedroom8.jpg",
          "bedroom9.jpg"
        ],
        "host_information": "Jane Smith, +0987654321, jane.smith@example.com",
        "slug": "budget-inn"
      },
      {
        "address": "789 Ocean Drive, Beach City, Country",
        "images": [
          "bedroom1.jpg",
          "bedroom2.jpg",
          "bedroom3.jpg",
          "bedroom4.jpg",
          "bedroom5.jpg",
          "bedroom6.jpg",
          "bedroom7.jpg",
          "bedroom8.jpg",
          "bedroom9.jpg"
        ],
        "host_information": "Carlos Gomez, +1122334455, carlos.gomez@example.com",
        "slug": "luxury-resort"
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
        "slug": "redisson-blu",
        "images": ["bedroom3.jpg", "bedroom4.jpg"],
        "title": "Redisson Blu Hotel",
        "description": "A luxurious stay in the heart of the city.",
        "guest_count": 4,
        "bedroom_count": 2,
        "bathroom_count": 1,
        "amenities": ["Free WiFi", "Breakfast included", "Swimming Pool"],
        "host_information": "John Doe, +1234567890, john.doe@example.com",
        "address": "123 Main St, Cityville, Country",
        "latitude": 40.7128,
        "longitude": -74.006
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
      "room_slug": "room-1",
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
        "room_slug": "room-1",
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

Here's a detailed README file for your Hotel Management System backend project:

# Hotel Management System Backend

This project is a backend application for managing hotel and room details using Node.js, Express.js, and PostgreSQL.


## [**🔗Frontend**](https://github.com/imrancse190/Frontend-ReactJS-NodeJS-Assignment)
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

2. **The server will run on `http://localhost:3000`. In frontend data fetch from `http://localhost:3000` this url. If you change this url then make sure you also change in frontend config file base url.**

## API Endpoints

### Hotel Endpoints

- **Create a hotel**

  - **URL:** `POST /hotel`
  - **Body:**

    ```json
    {
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

  - **Response:**

    ```json
    {
      "message": "Hotel created successfully"
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
      "slug": "mountain-retreat",
      "images": [
        "./assets/images/bedroom7.jpg",
        "./assets/images/bedroom4.jpg",
        "./assets/images/bedroom8.jpg",
        "./assets/images/bedroom1.jpg",
        "./assets/images/bedroom2.jpg",
        "./assets/images/bedroom6.jpg",
        "./assets/images/bedroom3.jpg",
        "./assets/images/bedroom9.jpg",
        "./assets/images/bedroom5.jpg"
      ],
      "title": "Mountain Retreat",
      "description": "Escape to the tranquility of the mountains at our cozy Mountain Retreat. Perfect for nature lovers and adventure seekers.",
      "guest_count": 6,
      "bedroom_count": 4,
      "bathroom_count": 2,
      "amenities": ["Free WiFi", "Mountain View", "Hiking Trails"],
      "host_information": "Charlie Brown, +154367890, charlie.brown@example.com",
      "address": "101 Pine St, Mountainville, Country",
      "latitude": 37.7749,
      "longitude": -122.4194
    }
    ```

- **Update a hotel**

  - **URL:** `PUT /hotel/:slug`
  - **Body:** (similar to create)
  - **Response:**

    ```json
    {
      "message": "Hotel updated successfully"
    }
    ```

- **Delete a hotel**

  - **URL:** `DELETE /hotel/:slug`
  - **Response:**

    ```json
    {
      "message": "Hotel deleted successfully"
    }
    ```

### Room Endpoints

- **Create a room**

  - **URL:** `POST /hotel/:hotel_slug/room`
  - **Body:**

    ```json
    {
      "room_image": "./assets/images/bedroom3.jpg",
      "room_title": "Deluxe Room",
      "bedroom_count": 1
    }
    ```

  - **Response:**

    ```json
    {
      "message": "Room created successfully",
      "room_slug": "deluxe-room"
    }
    ```

- **Get all rooms of a hotel**

  - **URL:** `GET /hotel/:hotel_slug/room`
  - **Response:**

    ```json
    [
      {
        "hotel_slug": "redisson-blu",
        "room_slug": "deluxe-room",
        "room_image": "r./assets/images/bedroom3.jpg",
        "room_title": "Deluxe Room",
        "bedroom_count": 1
      },
      {
        "hotel_slug": "redisson-blu",
        "room_slug": "suite-room",
        "room_image": "./assets/images/bedroom8.jpg",
        "room_title": "Suite Room",
        "bedroom_count": 2
      }
    ]
    ```

- **Get a room**

  - **URL:** `GET /hotel/:hotel_slug/room/:room_slug`
  - **Response:**

    ```json
    {
      "hotel_slug": "redisson-blu",
      "room_slug": "deluxe-room",
      "room_image": "./assets/images/bedroom5.jpg",
      "room_title": "Deluxe Room",
      "bedroom_count": 1
    }
    ```

- **Update a room**

  - **URL:** `PUT /hotel/:hotel_slug/room/:room_slug`
  - **Body:** (similar to create)
  - **Response:**

    ```json
    {
      "message": "Room updated successfully"
    }
    ```

- **Delete a room**

  - **URL:** `DELETE /hotel/:hotel_slug/room/:room_slug`
  - **Response:**

    ```json
    {
      "message": "Room deleted successfully"
    }
    ```

## Database Schema

### Hotels Table

```sql
CREATE TABLE hotels (
    slug VARCHAR(255) PRIMARY KEY,
    images TEXT[],
    title VARCHAR

(255) NOT NULL,
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

- **Environment Variables:** Ensure you set up environment variables for database credentials and other sensitive information.
- **Error Handling:** Proper error handling is implemented to ensure the API responds with appropriate error messages.
- **Validation:** Input validation is performed to ensure data integrity.

Feel free to customize this README file further based on your project's specific requirements and additional features.
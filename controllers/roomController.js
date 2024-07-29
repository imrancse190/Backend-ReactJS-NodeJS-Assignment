const pool = require("../db");
const slugify = require("slugify");

// Room Controllers
const createRoom = async (req, res) => {
  try {
    const { hotel_slug: hotelSlugParam } = req.params;
    const {
      hotel_slug: hotelSlugBody,
      room_image,
      room_title,
      bedroom_count,
    } = req.body;

    const hotel_slug = hotelSlugBody || hotelSlugParam;

    if (!hotel_slug || !room_image || !room_title || !bedroom_count) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let room_slug = slugify(room_title, { lower: true, strict: true });

    // Ensure the slug is unique
    const existingSlugs = await pool.query(
      "SELECT room_slug FROM rooms WHERE room_slug LIKE $1",
      [`${room_slug}%`]
    );
    if (existingSlugs.rowCount > 0) {
      const slugSet = new Set(existingSlugs.rows.map((row) => row.room_slug));
      let counter = 1;
      while (slugSet.has(`${room_slug}-${counter}`)) {
        counter++;
      }
      room_slug = `${room_slug}-${counter}`;
    }

    const query =
      "INSERT INTO rooms (hotel_slug, room_slug, room_image, room_title, bedroom_count) VALUES ($1, $2, $3, $4, $5)";
    const values = [
      hotel_slug,
      room_slug,
      room_image,
      room_title,
      bedroom_count,
    ];
    await pool.query(query, values);
    res.status(201).json({ message: "Room created successfully", room_slug });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHotelRooms = async (req, res) => {
  const { hotel_slug } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM rooms WHERE hotel_slug = $1",
      [hotel_slug]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRoom = async (req, res) => {
  const { hotel_slug, room_slug } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM rooms WHERE hotel_slug = $1 AND room_slug = $2",
      [hotel_slug, room_slug]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRoom = async (req, res) => {
  try {
    const { hotel_slug, room_slug } = req.params;
    const { room_image, room_title, bedroom_count } = req.body;

    const query =
      "UPDATE rooms SET room_image = $1, room_title = $2, bedroom_count = $3 WHERE hotel_slug = $4 AND room_slug = $5";
    const values = [
      room_image,
      room_title,
      bedroom_count,
      hotel_slug,
      room_slug,
    ];
    await pool.query(query, values);
    res.status(200).json({ message: "Room updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRoom = async (req, res) => {
  const { hotel_slug, room_slug } = req.params;
  try {
    await pool.query(
      "DELETE FROM rooms WHERE hotel_slug = $1 AND room_slug = $2",
      [hotel_slug, room_slug]
    );
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRoom,
  getRoom,
  updateRoom,
  deleteRoom,
  getHotelRooms,
};

const pool = require("../db");

// Room Controllers
const createRoom = async (req, res) => {
  const { hotel_slug } = req.params;
  const { room_slug, room_image, room_title, bedroom_count } = req.body;
  try {
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
    res.status(201).json({ message: "Room created successfully" });
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
  const { hotel_slug, room_slug } = req.params;
  const { room_image, room_title, bedroom_count } = req.body;
  try {
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
};

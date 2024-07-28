const pool = require("../db");
const slugify = require("slugify");

const getAllHotels = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT address,images,host_information,slug FROM hotels"
    );
    if (result.rows.length) {
      res.status(200).json(result.rows);
    } else {
      throw "Item not found";
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createHotel = async (req, res) => {
  try {
    const {
      images,
      title,
      description,
      guest_count,
      bedroom_count,
      bathroom_count,
      amenities,
      host_information,
      address,
      latitude,
      longitude,
    } = req.body;

    let slug = slugify(title, { lower: true, strict: true });

    // Ensure the slug is unique
    const existingSlugs = await pool.query(
      "SELECT slug FROM hotels WHERE slug LIKE $1",
      [`${slug}%`]
    );
    if (existingSlugs.rowCount > 0) {
      const slugSet = new Set(existingSlugs.rows.map((row) => row.slug));
      let counter = 1;
      while (slugSet.has(`${slug}-${counter}`)) {
        counter++;
      }
      slug = `${slug}-${counter}`;
    }


    const query =
      "INSERT INTO hotels (slug, images, title, description, guest_count, bedroom_count, bathroom_count, amenities, host_information, address, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)";
    const values = [
      slug,
      images,
      title,
      description,
      guest_count,
      bedroom_count,
      bathroom_count,
      amenities,
      host_information,
      address,
      latitude,
      longitude,
    ];
    await pool.query(query, values);
    res.status(201).json({ message: "Hotel created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHotel = async (req, res) => {
  const { slug } = req.params;
  try {
    const result = await pool.query("SELECT * FROM hotels WHERE slug = $1", [
      slug,
    ]);

    if (result.rows.length) {
      res.status(200).json(result.rows[0]);
    } else {
      throw "Item not found";
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateHotel = async (req, res) => {
  try {
  const { slug } = req.params;
  const {
    images,
    title,
    description,
    guest_count,
    bedroom_count,
    bathroom_count,
    amenities,
    host_information,
    address,
    latitude,
    longitude,
  } = req.body;
  
    const query =
      "UPDATE hotels SET images = $1, title = $2, description = $3, guest_count = $4, bedroom_count = $5, bathroom_count = $6, amenities = $7, host_information = $8, address = $9, latitude = $10, longitude = $11 WHERE slug = $12";
    const values = [
      images,
      title,
      description,
      guest_count,
      bedroom_count,
      bathroom_count,
      amenities,
      host_information,
      address,
      latitude,
      longitude,
      slug,
    ];
    await pool.query(query, values);
    res.status(200).json({ message: "Hotel updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteHotel = async (req, res) => {
  const { slug } = req.params;
  try {
    await pool.query("DELETE FROM hotels WHERE slug = $1", [slug]);
    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllHotels,
  createHotel,
  getHotel,
  updateHotel,
  deleteHotel,
};

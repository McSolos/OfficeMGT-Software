const pool = require('../config/db');

exports.createRequisition = async (req, res) => {
  const {
    engineerName,
    site,
    address,
    justification,
    deadline,
    materials
  } = req.body;

  const userId = req.user.id; // extracted from JWT in auth middleware

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [requisitionResult] = await connection.query(
      `INSERT INTO requisitions (engineer_name, site, address, justification, provide_on_or_before, created_by)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [engineerName, site, address, justification, deadline, userId]
    );

    const requisitionId = requisitionResult.insertId;

    const itemValues = materials.map(item => [
      requisitionId,
      item.name,
      item.quantity,
      item.description
    ]);

    await connection.query(
      `INSERT INTO requisition_items (requisition_id, item_name, quantity, description) VALUES ?`,
      [itemValues]
    );

    await connection.commit();
    res.status(201).json({ message: 'Requisition submitted successfully' });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ message: 'Failed to submit requisition' });
  } finally {
    connection.release();
  }
};

exports.getMyRequisitions = async (req, res) => {
    try {
      const userId = req.user.id; // user.id from jwt token payload
  
      const [requisitions] = await pool.query(
        `SELECT id, engineer_name, site, provide_on_or_before, status
         FROM requisitions
         WHERE created_by = ?
         ORDER BY created_at DESC`,
        [userId]
      );
  
      res.json(requisitions);
    } catch (error) {
      console.error('Error fetching user requisitions:', error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };
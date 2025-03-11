// controllers/aadhaarController.js
exports.checkAadhaar = (req, res) => {
  const { aadhaarNumber } = req.body;

  // In a real-world scenario, you would integrate with an Aadhaar verification API.
  // For this example, we'll use a simple validation check.

  if (typeof aadhaarNumber !== 'string' || aadhaarNumber.length !== 12 || !/^\d+$/.test(aadhaarNumber)) {
    return res.status(400).json({ error: 'Invalid Aadhaar number' });
  }

  // Simulate successful Aadhaar verification
  res.json({ valid: true, message: 'Aadhaar number verified' });
};
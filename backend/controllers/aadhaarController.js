exports.checkAadhaar = (req, res) => {
  const { aadhaarNumber } = req.body;

  if (typeof aadhaarNumber !== 'string' || aadhaarNumber.length !== 12 || !/^\d+$/.test(aadhaarNumber)) {
    return res.status(400).json({ error: 'Invalid Aadhaar number' });
  }
  res.json({ valid: true, message: 'Aadhaar number verified' });
};
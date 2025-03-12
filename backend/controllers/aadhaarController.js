const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.checkAadhaar = (req, res) => {
  const { aadhaarNumber } = req.body;

  if (typeof aadhaarNumber !== 'string' || aadhaarNumber.length !== 12 || !/^\d+$/.test(aadhaarNumber)) {
    return res.status(400).json({ error: 'Invalid Aadhaar number' });
  }
  res.json({ valid: true, message: 'Aadhaar number verified' });
};

exports.getAadhaars = async (req, res) => {
  try {
    const { hotelBookingId } = req.params;
    const checkIns = await prisma.hotelCheckIn.findMany({
      select: {
        id: true,
        hotelBookingId: true,
        aadhaarNumber: true,
      },
      where: {
        hotelBookingId: parseInt(hotelBookingId),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return res.json(checkIns);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong, please try again later." });;
  }
};

exports.storeAadhaars = async (req, res) => {
  try {
    const { aadhaars } = req.body;
    for (const aadhaar of aadhaars) {
      const { id, aadhaarNumber } = aadhaar;

      await prisma.hotelCheckIn.update({
        where: {
          id: parseInt(id),
        },
        data: {
          aadhaarNumber
        }
      })
    }
    return res.json({ aadhaars });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong, please try again later." });;
  }
};

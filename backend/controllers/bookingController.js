const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createBooking = async (req, res) => {
    const { userId, hotelId, aadhaarNumbers } = req.body;
    try {
        const booking = await prisma.hotelBooking.create({
            data: {
                userId: parseInt(userId),
                hotelId: parseInt(hotelId),
                aadhaarNumbers: aadhaarNumbers,
            },
        });
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
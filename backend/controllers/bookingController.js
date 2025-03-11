const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { getTokenValue } = require('../helpers/auth');

exports.createBooking = async (req, res) => {
    const { hotelId, datetime, guests } = req.body;
    const userId = getTokenValue(req);
    try {
        const booking = await prisma.hotelBooking.create({
            data: {
                userId: userId,
                hotelId: parseInt(hotelId),
                dateTime: new Date(datetime),
                guestCount: parseInt(guests),
            },
        });
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong, please try again later." });
    }
};
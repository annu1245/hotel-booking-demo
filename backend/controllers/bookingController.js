const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { getTokenValue } = require('../helpers/auth');

exports.createBooking = async (req, res) => {
    const { hotelId, checkIn, checkOut, guests } = req.body;
    if (new Date(checkOut) <= new Date(checkIn)) {
        return res.status(400).json({ error: 'Check-out must be after check-in.' });
    }
    try {
        const userId = getTokenValue(req);

        const overlappingBookings = await prisma.hotelBooking.findMany({
            where: {
                hotelId: parseInt(hotelId),
                OR: [
                    {
                        checkIn: {
                            lt: new Date(checkOut),
                        },
                        checkOut: {
                            gt: new Date(checkIn),
                        },
                    },
                ],
            },
        });

        if (overlappingBookings.length > 0) {
            return res.status(409).json({ error: 'The given slots are not available.' });
        }

        const booking = await prisma.hotelBooking.create({
            data: {
                userId: userId,
                hotelId: parseInt(hotelId),
                checkIn: new Date(checkIn),
                checkOut: new Date(checkOut),
                guestCount: parseInt(guests),
            },
        });
        return res.json(booking);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong, please try again later." });
    }
};
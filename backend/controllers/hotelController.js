const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllHotels = async (req, res) => {
    try {
        const hotels = await prisma.hotel.findMany();
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createHotel = async (req, res) => {
    const { name, location, price } = req.body;
    try {
        const hotel = await prisma.hotel.create({
            data: {
                name,
                location,
                price: parseInt(price),
            },
        });
        res.json(hotel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
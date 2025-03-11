import React, { useEffect, useState } from "react";
import useBooking from "../context/useBooking";
import toast from "react-hot-toast";

const CheckInPopUp = ({ selectedHotel, handleCloseModal }) => {
    const defaultAadhaars = {};
    for (let i = 0; i < selectedHotel.guestCount; i++) {
        defaultAadhaars[i] = { hotelBookingId: 0, aadhaar: "" };
    }

    const [aadhaars, setAadhaars] = useState(defaultAadhaars);

    const handleResetCloseModal = () => {
        setAadhaars([]);
        handleCloseModal();
    };

    const { aadhaarsResponse, getAadhaars, storeAadhaarsResponse, storeAadhaars } = useBooking();

    useEffect(() => {
        getAadhaars(selectedHotel.id);
    }, [selectedHotel]);

    const handleInputChange = (e) => {
        setAadhaars((currentValue) => {
            const index = parseInt(e.target.name);
            currentValue[index]["aadhaar"] += e.target.value;
            return currentValue;
        });
    };

    const validateAllAadhaars = () => {
        for (let i = 0; i < aadhaars.length; i++) {
            const aadhaar = aadhaars[i]["aadhaar"];
            if (typeof aadhaar !== "string" || aadhaar.length !== 12 || !/^\d+$/.test(aadhaar)) {
                return false;
            }
            toast.error("Invalid aadhaar number:", aadhaar);
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateAllAadhaars()) {
            await storeAadhaars(selectedHotel.id, aadhaars);
        }
    };

    useEffect(() => {
        if (storeAadhaarsResponse) {
            handleCloseModal();
        }
    }, [storeAadhaarsResponse]);

    return (
        <div className="fixed inset-0 flex justify-center items-center">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 z-10 relative">
                <h3 className="text-xl font-semibold mb-4">Fill aadhaars of check-ins for hotel {selectedHotel.name}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="max-h-100 overflow-y-auto pr-2">
                        {Object.values(aadhaars).map((aadhaar, index) => {
                            if (aadhaarsResponse?.[index]) {
                                aadhaar["hotelBookingId"] = aadhaarsResponse?.[index]["hotelBookingId"];
                                aadhaar["aadhaar"] = aadhaarsResponse?.[index]["aadhaarNumber"];
                            }
                            return (
                                <div className="py-2" key={index}>
                                    <label className="block text-sm font-medium text-gray-700">Aadhar-{index + 1}:</label>
                                    <input type="text" name={index} value={aadhaars[index].aadhaar} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" required />
                                </div>
                            );
                        })}
                        <div className="flex justify-end space-x-4">
                            <button type="button" onClick={handleResetCloseModal} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-300">
                                Close
                            </button>
                            <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">
                                Confirm Booking
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckInPopUp;

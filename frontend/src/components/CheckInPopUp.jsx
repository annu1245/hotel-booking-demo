import React, { useEffect, useState } from "react";
import useBooking from "../context/useBooking";
import toast from "react-hot-toast";

const CheckInPopUp = ({ selectedHotel, handleCloseModal }) => {
    const [aadhaars, setAadhaars] = useState([]);

    const handleResetCloseModal = () => {
        setAadhaars([]);
        handleCloseModal();
    };

    const { aadhaarsResponse, getAadhaars, storeAadhaarsResponse, updateAadhaars } = useBooking();

    useEffect(() => {
        getAadhaars(selectedHotel.id);
    }, [selectedHotel]);

    const handleInputChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setAadhaars((currentValue) => {
            const index = parseInt(e.target.name);
            const newValue = structuredClone(currentValue);
            newValue[index]["aadhaarNumber"] = value;
            return newValue;
        });
    };

    const validateAllAadhaars = () => {
        for (let i = 0; i < aadhaars.length; i++) {
            const aadhaar = aadhaars[i]["aadhaarNumber"];
            if (typeof aadhaar !== "string" || aadhaar.length !== 12 || !/^\d+$/.test(aadhaar)) {
                toast.error("Invalid aadhaar number: " + aadhaar);
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateAllAadhaars()) {
            await updateAadhaars({ aadhaars });
        }
    };

    useEffect(() => {
        if (aadhaarsResponse) {
            setAadhaars(aadhaarsResponse);
        }
    }, [aadhaarsResponse]);

    useEffect(() => {
        if (storeAadhaarsResponse) {
            toast.success("Successfully updated aadhaars.");
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
                        {aadhaars &&
                            aadhaars.map((aadhaar, index) => {
                                return (
                                    <div className="py-2" key={index}>
                                        <label className="block text-sm font-medium text-gray-700">Aadhar-{index + 1}:</label>
                                        <input type="text" name={index} value={aadhaar.aadhaarNumber} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" required />
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

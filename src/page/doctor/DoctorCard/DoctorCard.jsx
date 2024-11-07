import React from 'react';
import { FiStar, FiMapPin, FiClock } from 'react-icons/fi';

const DoctorCard = ({ doctor }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
            <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 truncate">
                    {doctor.name}
                </h3>
                <p className="text-gray-600 mb-2">{doctor.specialty}</p>
                <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, index) => (
                        <FiStar
                            key={index}
                            className={`${index < doctor.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                        {doctor.rating}/5
                    </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                    {doctor.experience} years experience
                </p>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                    <FiMapPin className="mr-1" />
                    <span>{doctor.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                    <FiClock className="mr-1" />
                    <span>{doctor.availability}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-bold">
                        ${doctor.consultationFee}
                    </span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DoctorCard;

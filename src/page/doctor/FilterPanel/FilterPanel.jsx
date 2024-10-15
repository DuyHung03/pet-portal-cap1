import React from "react";

const FilterPanel = ({
    selectedSpecialty, setSelectedSpecialty,
    selectedRating, setSelectedRating,
    selectedLocation, setSelectedLocation,
    selectedAvailability, setSelectedAvailability,
    sortBy, setSortBy 
}) => {
    const specialties = ["All", "Cardiologist", "Dermatologist", "Pediatrician", "Neurologist"];
    const locations = ["All", "New York", "Los Angeles", "Chicago", "Houston"];
    const availabilities = ["All", "Morning", "Afternoon", "Evening"];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                    <select
                        value={selectedSpecialty}
                        onChange={(e) => setSelectedSpecialty(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    >
                        {specialties.map(specialty => (
                            <option key={specialty} value={specialty}>{specialty}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    >
                        {locations.map(location => (
                            <option key={location} value={location}>{location}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                    <select
                        value={selectedAvailability}
                        onChange={(e) => setSelectedAvailability(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    >
                        {availabilities.map(availability => (
                            <option key={availability} value={availability}>{availability}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <select
                        value={selectedRating}
                        onChange={(e) => setSelectedRating(Number(e.target.value))}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value={0}>All</option>
                        <option value={1}>1+ Star</option>
                        <option value={2}>2+ Stars</option>
                        <option value={3}>3+ Stars</option>
                        <option value={4}>4+ Stars</option>
                        <option value={5}>5 Stars</option>
                    </select>
                </div>

                {/* Thêm phần sắp xếp */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="name">Name</option>
                        <option value="rating">Rating</option>
                        <option value="experience">Experience</option>
                        <option value="consultationFee">Consultation Fee</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;

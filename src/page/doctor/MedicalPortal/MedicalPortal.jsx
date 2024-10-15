import React, { useState, useEffect } from "react";
import DoctorList from "../DoctorList/DoctorList";
import FilterPanel from "../FilterPanel/FilterPanel";
import Pagination from "../Pagination/Pagination";

const MedicalPortal = () => {
    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSpecialty, setSelectedSpecialty] = useState("All");
    const [selectedRating, setSelectedRating] = useState(0);
    const [selectedLocation, setSelectedLocation] = useState("All");
    const [selectedAvailability, setSelectedAvailability] = useState("All");
    const [sortBy, setSortBy] = useState("name");  
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(4);
    const [showFilters, setShowFilters] = useState(false);  

    useEffect(() => {
        const fetchDoctors = async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            const data = await response.json();
            setDoctors(data.map(user => ({
                ...user,
                specialty: ["Cardiologist", "Dermatologist", "Pediatrician", "Neurologist"][Math.floor(Math.random() * 4)],
                image: `https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80`,
                rating: Math.floor(Math.random() * 5) + 1,
                experience: Math.floor(Math.random() * 20) + 1,
                location: ["New York", "Los Angeles", "Chicago", "Houston"][Math.floor(Math.random() * 4)],
                availability: ["Morning", "Afternoon", "Evening"][Math.floor(Math.random() * 3)],
                consultationFee: Math.floor(Math.random() * 200) + 50,
            })));
        };
        fetchDoctors();
    }, []);

    const filteredDoctors = doctors.filter(doctor =>
        (doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedSpecialty === "All" || doctor.specialty === selectedSpecialty) &&
        (selectedLocation === "All" || doctor.location === selectedLocation) &&
        (selectedAvailability === "All" || doctor.availability === selectedAvailability) &&
        doctor.rating >= selectedRating
    );

    const sortedDoctors = [...filteredDoctors].sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "experience") return b.experience - a.experience;
        if (sortBy === "consultationFee") return a.consultationFee - b.consultationFee;
        return 0;
    });

    const indexOfLastDoctor = currentPage * productsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - productsPerPage;
    const currentDoctors = sortedDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

    const totalPages = Math.ceil(sortedDoctors.length / productsPerPage);

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="container mx-auto px-4 py-8">
                {/* Search term input always visible */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search doctors or specialties..."
                        className="w-full md:w-64 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Button to toggle filter visibility and sortBy */}
                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
                    >
                        {showFilters ? "Hide Filters" : "Show Filters"}
                    </button>
                    {/* Sort By dropdown */}
                    <div className="flex items-center space-x-2">
                        <label htmlFor="sortBy" className="text-gray-700">Sort By:</label>
                        <select
                            id="sortBy"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            <option value="name">Name</option>
                            <option value="rating">Rating</option>
                            <option value="experience">Experience</option>
                            <option value="consultationFee">Consultation Fee</option>
                        </select>
                    </div>
                </div>

                {showFilters && (
                    <FilterPanel
                        selectedSpecialty={selectedSpecialty}
                        setSelectedSpecialty={setSelectedSpecialty}
                        selectedRating={selectedRating}
                        setSelectedRating={setSelectedRating}
                        selectedLocation={selectedLocation}
                        setSelectedLocation={setSelectedLocation}
                        selectedAvailability={selectedAvailability}
                        setSelectedAvailability={setSelectedAvailability}
                    />
                )}

                <DoctorList doctors={currentDoctors} />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </main>
        </div>
    );
};

export default MedicalPortal;

import React from 'react';

const VolunteerMatching = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Title */}
                <h1 className="text-4xl font-bold text-center mb-8">Volunteer Matching</h1>

                {/* Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {/* Volunteers Column */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4">Volunteers</h2>
                        <div className="h-64 overflow-y-auto">
                            <ul className="space-y-4">
                                <li className="p-4 bg-gray-100 rounded">Volunteer 1</li>
                                <li className="p-4 bg-gray-100 rounded">Volunteer 2</li>
                                <li className="p-4 bg-gray-100 rounded">Volunteer 3</li>
                                <li className="p-4 bg-gray-100 rounded">Volunteer 4</li>
                                <li className="p-4 bg-gray-100 rounded">Volunteer 5</li>
                            </ul>
                        </div>
                    </div>

                    {/* Events Column */}
                    <div className="bg-white shadow-lg rounded-lg p-6 ">
                        <h2 className="text-2xl font-semibold mb-4">Events Available</h2>
                        <div className="h-64 overflow-y-auto">
                            <ul className="space-y-4">
                                <li className="p-4 bg-gray-100 rounded">Event 1</li>
                                <li className="p-4 bg-gray-100 rounded">Event 2</li>
                                <li className="p-4 bg-gray-100 rounded">Event 3</li>
                                <li className="p-4 bg-gray-100 rounded">Event 4</li>
                                <li className="p-4 bg-gray-100 rounded">Event 5</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Button */}
                <div className="flex justify-center">
                    <button className="bg-blue-600 text-white font-semibold py-3 px-8 rounded hover:bg-blue-700">
                        Create Matches
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VolunteerMatching;

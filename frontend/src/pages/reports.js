import React from 'react';
import axios from 'axios';

export default function DownloadReports() {
    const generateReports = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/users/volunteers-report', {
                responseType: 'blob' // Request the response as a blob
              });

            const csvLink = document.createElement('a');
            csvLink.href = window.URL.createObjectURL(response.data);
            csvLink.download = 'volunteer_report.csv';
            csvLink.click();
            window.URL.revokeObjectURL(csvLink.href);
        } catch (error) {
            console.error("Error downloading reports:", error);
            alert("Failed to generate reports.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 pt-24 p-8">
            <div className="flex justify-center">
                <button className="bg-primaryblue hover:bg-primaryblue-light text-white py-3 px-6 rounded-md shadow-md" onClick={generateReports}>
                    <p className="font-bold">Generate Volunteer Reports</p>
                </button>
            </div>
        </div>

    )
};


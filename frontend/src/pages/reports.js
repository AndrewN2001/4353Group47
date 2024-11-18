import React from 'react';
import axios from 'axios';

export default function DownloadReports() {
    const generateReports = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/users/volunteers-csv', {
                responseType: 'blob' 
              });

            const csvLink = document.createElement('a');
            csvLink.href = window.URL.createObjectURL(response.data);
            csvLink.download = 'volunteer_report.csv';
            document.body.appendChild(csvLink);
            csvLink.click();
            document.body.removeChild(csvLink);
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
                    <p className="font-bold">Generate Volunteers CSV</p>
                </button>
                <button className="bg-green-500 hover:bg-green-400 text-white py-3 px-6 rounded-md shadow-md">
                    <p className="font-bold">Generate Events CSV</p>
                </button>
            </div>
        </div>

    )
};


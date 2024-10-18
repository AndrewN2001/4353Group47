import React, { useState, useEffect } from 'react';
import { useAuth } from '../middleware/user-vertification';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function EventManagementForm() {
  const {isAdmin, isLoggedIn} = useAuth();
  const navigate = useNavigate();
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [location, setLocation] = useState('');
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [urgency, setUrgency] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');

  const skillsOptions = ['Communication', 'Leadership', 'Teamwork', 'Problem Solving', 'Technical'];
  const urgencyOptions = ['Low', 'Medium', 'High'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eventName && eventDescription && location && requiredSkills.length && urgency && startDate && startTime && endDate && endTime) {
      const eventData = {
        eventName,
        eventDescription,
        location,
        requiredSkills,
        urgency,
        startDate,
        startTime,
        endDate,
        endTime
      };
      // console.log(eventData);
      axios.post("http://localhost:3001/api/events/createevent", {eventData})
      .then(result => {
        console.log(result);
      })
      alert('Event created successfully!');
    } else {
      alert('Please fill out all required fields.');
    }
  };

  const handleSkillsChange = (e) => {
    const { options } = e.target;
    const selectedSkills = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedSkills.push(options[i].value);
      }
    }
    setRequiredSkills(selectedSkills);
  };
  
  useEffect(() => {
    if (!isLoggedIn || !isAdmin) {
        navigate('/not-authorized');
    }
}, [isLoggedIn, isAdmin, navigate])

  return (
    <div className="min-w-screen min-h-screen bg-gray-100 flex items-center">
      <div className="max-w-4xl mx-auto p-6 lg:p-12">
        <div className="shadow-xl p-8 rounded-sm flex flex-col gap-6 bg-white">
          <h2 className="text-5xl font-bold text-center mb-6">Event Management Form</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Event Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Event Name</label>
              <input
                type="text"
                maxLength="100"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
                className="border-2 border-gray-700 pl-3 py-2 rounded-sm w-full"
              />
            </div>

            {/* Event Description */}
            <div>
              <label className="block text-sm font-medium mb-1">Event Description</label>
              <textarea
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                required
                className="border-2 border-gray-700 pl-3 py-2 rounded-sm w-full"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <textarea
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="border-2 border-gray-700 pl-3 py-2 rounded-sm w-full"
              />
            </div>

            {/* Required Skills */}
            <div>
              <label className="block text-sm font-medium mb-1">Required Skills</label>
              <select
                multiple
                value={requiredSkills}
                onChange={handleSkillsChange}
                required
                className="border-2 border-gray-700 pl-3 py-2 rounded-sm w-full"
              >
                {skillsOptions.map((skill, index) => (
                  <option key={index} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>

            {/* Urgency */}
            <div>
              <label className="block text-sm font-medium mb-1">Urgency</label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                required
                className="border-2 border-gray-700 pl-3 py-2 rounded-sm w-full"
              >
                <option value="">Select urgency</option>
                {urgencyOptions.map((level, index) => (
                  <option key={index} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* Event Date */}
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <div className='flex items-center gap-3'>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="border-2 border-gray-700 pl-3 py-2 rounded-sm w-full"
                />
                <div class="relative">
                  <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
                      </svg>
                  </div>
                  <input 
                    type="time" 
                    id="time" 
                    class="border-2 leading-none border-gray-700 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    min="09:00" 
                    max="18:00" 
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required 
                  />
                </div>
              </div>
              
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <div className='flex items-center gap-3'>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="border-2 border-gray-700 pl-3 py-2 rounded-sm w-full"
                />
                <div class="relative">
                  <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
                      </svg>
                  </div>
                  <input 
                    type="time" 
                    id="time" 
                    class="border-2 leading-none border-gray-700 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    min="09:00" 
                    max="18:00" 
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required 
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-400 text-white py-3 px-6 rounded-md font-bold"
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EventManagementForm;


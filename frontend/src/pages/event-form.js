import React, { useState } from 'react';

function EventManagementForm() {

  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [location, setLocation] = useState('');
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [urgency, setUrgency] = useState('');
  const [eventDate, setEventDate] = useState('');

  const skillsOptions = ['Communication', 'Leadership', 'Teamwork', 'Problem Solving', 'Technical'];
  const urgencyOptions = ['Low', 'Medium', 'High'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eventName && eventDescription && location && requiredSkills.length && urgency && eventDate) {
      const eventData = {
        eventName,
        eventDescription,
        location,
        requiredSkills,
        urgency,
        eventDate,
      };
      console.log(eventData);
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
  

  return (
    <div className="min-w-screen min-h-screen bg-slate-50 flex items-center">
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
              <label className="block text-sm font-medium mb-1">Event Date</label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
                className="border-2 border-gray-700 pl-3 py-2 rounded-sm w-full"
              />
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
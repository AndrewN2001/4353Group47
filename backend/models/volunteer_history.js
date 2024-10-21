const volunteerHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true }], 
  });
  
  module.exports = mongoose.model('VolunteerHistory', volunteerHistorySchema);
  
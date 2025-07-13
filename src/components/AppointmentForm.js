import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

function AppointmentForm({ date, appointment, patients, doctors, onSave, onCancel, onDelete }) {
  const [formData, setFormData] = useState({
    patient: '',
    doctor: '',
    time: ''
  });

  useEffect(() => {
    if (appointment) {
      setFormData({
        patient: appointment.patient.toString(),
        doctor: appointment.doctor.toString(),
        time: appointment.time
      });
    } else {
      setFormData({
        patient: '',
        doctor: '',
        time: ''
      });
    }
  }, [appointment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.patient || !formData.doctor || !formData.time) {
      alert('Please fill in all fields');
      return;
    }

    const appointmentData = {
      ...formData,
      date: format(date, 'yyyy-MM-dd'),
      patient: parseInt(formData.patient),
      doctor: parseInt(formData.doctor)
    };

    onSave(appointmentData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getPatientName = (patientId) => {
    const patient = patients.find(p => p.id === parseInt(patientId));
    return patient ? patient.name : 'Unknown Patient';
  };

  const getDoctorName = (doctorId) => {
    const doctor = doctors.find(d => d.id === parseInt(doctorId));
    return doctor ? doctor.name : 'Unknown Doctor';
  };

  return (
    <div className="appointment-form">
      <h2>
        {appointment ? 'Edit Appointment' : 'Add Appointment'}
      </h2>
      
      <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666' }}>
        {format(date, 'EEEE, MMMM d, yyyy')}
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div>
            <label htmlFor="patient">Patient</label>
            <select
              id="patient"
              name="patient"
              value={formData.patient}
              onChange={handleChange}
              required
            >
              <option value="">Select Patient</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="doctor">Doctor</label>
            <select
              id="doctor"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              required
            >
              <option value="">Select Doctor</option>
              {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {appointment && (
          <div style={{ 
            background: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '5px', 
            marginBottom: '20px' 
          }}>
            <h4>Current Appointment Details:</h4>
            <p><strong>Patient:</strong> {getPatientName(appointment.patient)}</p>
            <p><strong>Doctor:</strong> {getDoctorName(appointment.doctor)}</p>
            <p><strong>Time:</strong> {appointment.time}</p>
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          
          {appointment && (
            <button 
              type="button" 
              className="btn btn-danger" 
              onClick={() => onDelete(appointment.id)}
            >
              Delete
            </button>
          )}
          
          <button type="submit" className="btn">
            {appointment ? 'Update' : 'Save'} Appointment
          </button>
        </div>
      </form>
    </div>
  );
}

export default AppointmentForm; 
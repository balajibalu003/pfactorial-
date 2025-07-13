import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, parseISO } from 'date-fns';
import AppointmentForm from './AppointmentForm';

const PATIENTS = [
    { id: 1, name: 'Balaji' },
    { id: 9, name: 'Aarav Patel' },
    { id: 10, name: 'Isha Sharma' },
    { id: 11, name: 'Rahul Verma' },
    { id: 12, name: 'Sneha Reddy' },
    { id: 13, name: 'Devansh Mehta' },
    { id: 14, name: 'Priya Singh' },
    { id: 15, name: 'Karan Joshi' }
  ];
  

const DOCTORS = [
    { id: 1, name: 'Dr. Ananya Iyer' },
    { id: 2, name: 'Dr. Rohan Malhotra' },
    { id: 3, name: 'Dr. Priyanka Desai' },
    { id: 4, name: 'Dr. Arvind Nair' },
    { id: 5, name: 'Dr. Meera Choudhary' }
  ];

function Calendar({ onLogout }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [mobileSelectedDate, setMobileSelectedDate] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [filterValue, setFilterValue] = useState('');

  
  useEffect(() => {
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const getCalendarDays = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start, end });
    
    
    const firstDay = start.getDay();
    const leadingDays = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      const date = new Date(start);
      date.setDate(date.getDate() - (i + 1));
      leadingDays.push(date);
    }
    
    
    const lastDay = end.getDay();
    const trailingDays = [];
    for (let i = 1; i <= 6 - lastDay; i++) {
      const date = new Date(end);
      date.setDate(date.getDate() + i);
      trailingDays.push(date);
    }
    
    return [...leadingDays, ...days, ...trailingDays];
  };

  const getAppointmentsForDate = (date) => {
    let filteredAppointments = appointments.filter(appointment => 
      isSameDay(parseISO(appointment.date), date)
    );

    if (filterType === 'doctor' && filterValue) {
      filteredAppointments = filteredAppointments.filter(appointment => 
        appointment.doctor === parseInt(filterValue)
      );
    } else if (filterType === 'patient' && filterValue) {
      filteredAppointments = filteredAppointments.filter(appointment => 
        appointment.patient === parseInt(filterValue)
      );
    }

    return filteredAppointments.sort((a, b) => a.time.localeCompare(b.time));
  };

  const handleDateClick = (date) => {
    if (isSameMonth(date, currentDate)) {
      setSelectedDate(date);
      setShowForm(true);
      setEditingAppointment(null);
    }
  };

  const handleAppointmentClick = (appointment, e) => {
    e.stopPropagation();
    setEditingAppointment(appointment);
    setShowForm(true);
  };

  const handleSaveAppointment = (appointmentData) => {
    if (editingAppointment) {
      
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === editingAppointment.id ? appointmentData : apt
        )
      );
    } else {
      
      const newAppointment = {
        ...appointmentData,
        id: Date.now().toString()
      };
      setAppointments(prev => [...prev, newAppointment]);
    }
    setShowForm(false);
    setEditingAppointment(null);
  };

  const handleDeleteAppointment = (appointmentId) => {
    setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
    setShowForm(false);
    setEditingAppointment(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAppointment(null);
  };

  const getPatientName = (patientId) => {
    const patient = PATIENTS.find(p => p.id === parseInt(patientId));
    return patient ? patient.name : 'Unknown Patient';
  };

  const getDoctorName = (doctorId) => {
    const doctor = DOCTORS.find(d => d.id === parseInt(doctorId));
    return doctor ? doctor.name : 'Unknown Doctor';
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleFilterChange = (type, value) => {
    setFilterType(type);
    setFilterValue(value);
  };

  const clearFilters = () => {
    setFilterType('all');
    setFilterValue('');
  };

  const calendarDays = getCalendarDays();
  const mobileAppointments = getAppointmentsForDate(mobileSelectedDate);

  return (
    <div className="container">
      <div className="calendar-header">
        <h1>Clinic Appointment Calendar</h1>
        <div className="calendar-nav">
          <button onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
            Previous
          </button>
          <h2>{format(currentDate, 'MMMM yyyy')}</h2>
          <button onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
            Next
          </button>
          <button onClick={toggleTheme} className="theme-toggle">
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button onClick={onLogout} style={{ marginLeft: '20px' }}>
            Logout
          </button>
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-controls">
          <div className="filter-group">
            <label htmlFor="filterType">Filter by:</label>
            <select 
              id="filterType" 
              value={filterType} 
              onChange={(e) => handleFilterChange(e.target.value, '')}
            >
              <option value="all">All Appointments</option>
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
            </select>
          </div>
          
          {filterType === 'doctor' && (
            <div className="filter-group">
              <label htmlFor="doctorFilter">Select Doctor:</label>
              <select 
                id="doctorFilter" 
                value={filterValue} 
                onChange={(e) => handleFilterChange('doctor', e.target.value)}
              >
                <option value="">All Doctors</option>
                {DOCTORS.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {filterType === 'patient' && (
            <div className="filter-group">
              <label htmlFor="patientFilter">Select Patient:</label>
              <select 
                id="patientFilter" 
                value={filterValue} 
                onChange={(e) => handleFilterChange('patient', e.target.value)}
              >
                <option value="">All Patients</option>
                {PATIENTS.map(patient => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {(filterType === 'doctor' || filterType === 'patient') && (
            <button onClick={clearFilters} className="btn btn-secondary">
              Clear Filter
            </button>
          )}
        </div>
      </div>

      <div className="mobile-date-picker">
        <input
          type="date"
          value={format(mobileSelectedDate, 'yyyy-MM-dd')}
          onChange={(e) => setMobileSelectedDate(new Date(e.target.value))}
        />
      </div>

      <div className="mobile-day-view">
        <div className="day-appointments">
          <h3>{format(mobileSelectedDate, 'EEEE, MMMM d, yyyy')}</h3>
          {mobileAppointments.length === 0 ? (
            <p>No appointments for this day</p>
          ) : (
            mobileAppointments.map(appointment => (
              <div key={appointment.id} className="appointment-item">
                <div className="appointment-time">{appointment.time}</div>
                <div className="appointment-details">
                  {getPatientName(appointment.patient)} with {getDoctorName(appointment.doctor)}
                </div>
              </div>
            ))
          )}
          <button 
            className="btn" 
            onClick={() => {
              setSelectedDate(mobileSelectedDate);
              setShowForm(true);
              setEditingAppointment(null);
            }}
            style={{ marginTop: '20px' }}
          >
            Add Appointment
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}
        
        {calendarDays.map((day, index) => {
          const dayAppointments = getAppointmentsForDate(day);
          const isOtherMonth = !isSameMonth(day, currentDate);
          const isToday = isSameDay(day, new Date());
          
          return (
            <div
              key={index}
              className={`calendar-day ${isOtherMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}`}
              onClick={() => handleDateClick(day)}
            >
              <div className="day-header">{format(day, 'd')}</div>
              {dayAppointments.map(appointment => (
                <div
                  key={appointment.id}
                  className="appointment"
                  onClick={(e) => handleAppointmentClick(appointment, e)}
                  title={`${appointment.time} - ${getPatientName(appointment.patient)} with ${getDoctorName(appointment.doctor)}`}
                >
                  {appointment.time} - {getPatientName(appointment.patient)}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <AppointmentForm
            date={selectedDate}
            appointment={editingAppointment}
            patients={PATIENTS}
            doctors={DOCTORS}
            onSave={handleSaveAppointment}
            onCancel={handleCancel}
            onDelete={handleDeleteAppointment}
          />
        </div>
      )}
    </div>
  );
}

export default Calendar; 
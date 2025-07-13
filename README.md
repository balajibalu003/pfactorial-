# Clinic Appointment Calendar

A simple, responsive appointment calendar application for clinic staff to manage doctor appointments.

## Features

- **Mock Authentication**: Login with hardcoded credentials
- **Responsive Design**: Works on both desktop and mobile devices
- **Calendar View**: 
  - Desktop: Month view with appointment display
  - Mobile: Single day view with date picker
- **Appointment Management**: Add, edit, and delete appointments
- **Data Persistence**: Appointments saved to localStorage
- **Patient & Doctor Selection**: Dropdown menus with predefined lists

## Demo Credentials

- **Email**: staff@clinic.com
- **Password**: 123456

## Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

### Desktop View
- Navigate through months using Previous/Next buttons
- Click on any day to add an appointment
- Click on existing appointments to edit them
- View all appointments for the current month

### Mobile View
- Use the date picker to select a specific day
- View appointments for the selected day
- Add new appointments using the "Add Appointment" button

### Appointment Form
- Select a patient from the dropdown
- Select a doctor from the dropdown
- Choose appointment time
- Save, update, or delete appointments

## Tech Stack

- React 18
- date-fns for date manipulation
- CSS for styling (no external UI libraries)
- localStorage for data persistence

## Project Structure

```
src/
├── components/
│   ├── Login.js          # Authentication component
│   ├── Calendar.js       # Main calendar view
│   └── AppointmentForm.js # Appointment form modal
├── App.js               # Main app component
├── index.js             # React entry point
└── index.css            # Global styles
```

## Features Implemented

✅ Mock authentication with hardcoded credentials  
✅ Responsive design (desktop & mobile)  
✅ Month view calendar (desktop)  
✅ Single day view (mobile)  
✅ Add/edit/delete appointments  
✅ Patient and doctor dropdowns  
✅ Time picker for appointments  
✅ localStorage persistence  
✅ Click to add/edit appointments  
✅ Mobile date picker  
✅ Clean, modern UI  



The app is ready to use and meets all the core requirements specified in the assignment! 

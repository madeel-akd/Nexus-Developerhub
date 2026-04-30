import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Calendar as CalendarIcon } from 'lucide-react';

export const MeetingCalendar: React.FC = () => {
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Strategy Session',
      start: new Date().toISOString().replace(/T.*$/, 'T10:00:00'),
      end: new Date().toISOString().replace(/T.*$/, 'T11:00:00'),
      backgroundColor: '#10b981', // success-500 (Green)
      borderColor: '#059669',
      extendedProps: { type: 'meeting' }
    }
  ]);

  // Handle adding availability slots
  const handleDateSelect = (selectInfo: any) => {
    const title = window.prompt('Set Availability Slot Name:');
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    if (title) {
      setEvents([
        ...events,
        {
          id: String(Date.now()),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          backgroundColor: '#3b82f6', // primary-500 (Blue)
          borderColor: '#2563eb',
          extendedProps: { type: 'availability' }
        },
      ]);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-white border-b flex justify-between items-center">
        <div className="flex items-center gap-2">
          <CalendarIcon size={20} className="text-primary-600" />
          <h2 className="text-lg font-semibold text-gray-900">Meeting Schedule</h2>
        </div>
        <div className="flex gap-4 text-xs">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span> Availability
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span> Meetings
          </span>
        </div>
      </CardHeader>
      <CardBody className="p-0">
        <div className="p-4 calendar-container custom-calendar">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'timeGridWeek,timeGridDay'
            }}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            events={events}
            select={handleDateSelect}
            height="500px"
            slotMinTime="08:00:00"
            slotMaxTime="20:00:00"
          />
        </div>
      </CardBody>
      
      {/* Tailwind scoped overrides for FullCalendar */}
      <style>{`
        .fc .fc-button-primary {
          background-color: #4f46e5;
          border-color: #4f46e5;
          text-transform: capitalize;
        }
        .fc .fc-button-primary:hover {
          background-color: #4338ca;
        }
        .fc .fc-toolbar-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #111827;
        }
        .fc-theme-standard td, .fc-theme-standard th {
          border-color: #f3f4f6;
        }
      `}</style>
    </Card>
  );
};
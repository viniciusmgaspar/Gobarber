import Appointment from '../models/Appointment';
import {startOfHour, parseISO, isEqual } from 'date-fns';

class AppointmentsRepository {
    appointments: Appointment[];

    constructor() {
        this.appointments = []

    }

    public FindByDate ( date: Date): Appointment | null {
        const findAppointment = this.appointments.find(appointment => isEqual(date, appointment.date));

        return findAppointment || null;

    }

    public create(provider: string, date: Date): Appointment {
        const appointment = new Appointment(provider, date)

        this.appointments.push(appointment);

        return appointment;
    }
}


export default AppointmentsRepository;
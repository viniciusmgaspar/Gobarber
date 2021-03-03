
import {getCustomRepository} from 'typeorm'
import {startOfHour } from 'date-fns';

import AppError from '../errors/AppError';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointment';
import appointmentsRouter from '../routes/appointments.routes';



interface Request {
    provider_id:string;
    date: Date;
}
class CreateAppointmentService {
     public async execute({provider_id, date}: Request): Promise<Appointment> {

        const appointmentsRepository = getCustomRepository(AppointmentsRepository);


        const appointmentDate = startOfHour(date);

        const findAppointmentInTheSameDate = await appointmentsRepository.FindByDate(appointmentDate);

        if(findAppointmentInTheSameDate){
            throw new AppError('This appointment is already booked', 400)

        }


        const appointment = appointmentsRepository.create({
        provider_id,
        date: appointmentDate,
        });

        await appointmentsRepository.save(appointment)

        return appointment;
    }
}

export default CreateAppointmentService;

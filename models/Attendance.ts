import { model, models, Schema } from "mongoose";

const AttendanceSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    stateChapter: {
        type: String,
        required: true,
    },
    attendance: {
        type: String,
        required: true,
    },
    comingFrom: {
        type: String,
        required: true,
    },
    accommodation: {
        type: String,
        required: true,
    },
    logistics: {
        type: String,
        required: true,
    },
    financialSupport: {
        type: String,
        required: true,
    },
    financialSupportAmount: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
}, {timestamps: true});

export const Attendance = models?.Attendance || model('Attendance', AttendanceSchema);
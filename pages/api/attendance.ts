import { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "@/lib/mongoose";
import { Attendance } from "@/models/Attendance";
import { BookingDataArray, BookingDataProps } from "@/types/BookingDataProps";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await mongooseConnect();
    if (req.method === "GET") {
        try {
            const attendanceData = await Attendance.find({}).sort({ createdAt: -1 }).exec();
            const formattedData: BookingDataArray = attendanceData.map((item) => ({
                _id: item._id?.toString(),
                name: item.name,
                stateChapter: item.stateChapter,
                attendance: item.attendance,
                comingFrom: item.comingFrom,
                accommodation: item.accommodation,
                logistics: item.logistics,
                financialSupport: item.financialSupport,
                financialSupportAmount: item.financialSupportAmount,
                email: item.email,
            }));
            res.status(200).json(formattedData);
        }
        catch (error) {
            console.error("Error fetching attendance data:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else if (req.method === "POST") {
        try {            
            const formattedData: BookingDataProps = {
                name: req.body.name,
                stateChapter: req.body.stateChapter,
                attendance: req.body.attendance,
                comingFrom: req.body.comingFrom,
                accommodation: req.body.accommodation,
                logistics: req.body.logistics,
                financialSupport: req.body.financialSupport,
                financialSupportAmount: req.body.financialSupportAmount,
                email: req.body.email,
            };
            const newAttendance = new Attendance(formattedData);
            await newAttendance.save();
            res.status(201).json({ message: "Attendance recorded successfully" });
        } catch (error) {
            console.error("Error saving attendance data:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else if (req.method === "DELETE") {
        const { id } = req.query;
        if (!id || typeof id !== "string") {
            return res.status(400).json({ error: "Invalid ID" });
        }
        try {
            const deletedAttendance = await Attendance.findByIdAndDelete(id);
            if (!deletedAttendance) {
                return res.status(404).json({ error: "Attendance not found" });
            }
            res.status(200).json({ message: "Attendance deleted successfully" });
        } catch (error) {
            console.error("Error deleting attendance data:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
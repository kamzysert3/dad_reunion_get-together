export interface BookingDataProps {
    _id?: string;
    name: string;
    stateChapter: string;
    attendance: string;
    comingFrom: string;
    accommodation: string;
    logistics: string;
    financialSupport: string;
    financialSupportAmount: number;
    email: string;
}

export type BookingDataArray = BookingDataProps[]
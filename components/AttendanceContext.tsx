import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface AttendanceData {
    _id?: string;
    name: string;
    stateChapter: string;
    attendance: string;
    comingFrom: string;
    accommodation: string;
    logistics: string;
    financialSupport: string;
    financialSupportAmount: string;
    email: string;
}

interface AttendanceContextType {
  data: AttendanceData | null;
  setData: (data: AttendanceData) => void;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export const AttendanceProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<AttendanceData | null>(null);
  return (
    <AttendanceContext.Provider value={{ data, setData }}>
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error('useAttendance must be used within an AttendanceProvider');
  }
  return context;
};

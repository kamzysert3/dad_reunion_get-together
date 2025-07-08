import { useState } from "react";
import { useRef } from "react";
import ConfirmDialog from "./ConfirmDialog";
import { useRouter } from "next/router";
import { useAttendance } from "./AttendanceContext";
import Toast from "./toast";

export default function BookingForm() {
  const [name, setName] = useState<string>('');
  const [stateChapter, setStateChapter] = useState<string>('');
  const [noStateChapter, setNoStateChapter] = useState<boolean>(false);
  const [attendance, setAttendance] = useState<string>('');
  const [comingFrom, setComingFrom] = useState<string>('');
  const [accommodation, setAccommodation] = useState<string>('');
  const [logistics, setLogistics] = useState<string>('');
  const [financialSupport, setFinancialSupport] = useState<string>('');
  const [financialSupportAmount, setfinancialSupportAmount] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [submitStatus , setSubmitStatus] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);
  const [toastSuccess, setToastSuccess] = useState<boolean>(false);
  const toastTimeout = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();
  const { setData } = useAttendance();

  const formatCurrency = (value: string) => {
    const digits = value.replace(/\D/g, "");
    const number = Number(digits);
    if (!number) return "";
    return number.toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowDialog(true);
  };

  const handleDialogConfirm = async () => {
    setSubmitStatus(true);

    const formData = {
      name,
      stateChapter,
      attendance,
      comingFrom,
      accommodation,
      logistics,
      financialSupport,
      financialSupportAmount: getNumericValue(financialSupportAmount),
      email
    };

    try {
      const response = await fetch('/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);
        setShowDialog(false);
        setToast('Registration submitted successfully!');
        setToastSuccess(true);
        setData({
          name,
          stateChapter,
          attendance,
          comingFrom,
          accommodation,
          logistics,
          financialSupport,
          financialSupportAmount,
          email,
        });
        router.push('/ticket');
        if (toastTimeout.current) clearTimeout(toastTimeout.current);
        toastTimeout.current = setTimeout(() => setToast(null), 5000);       
      } else {
        throw new Error('Failed to submit registration');
      }
    } catch (error: any) {
      console.error("Error submitting registration:", error);
      setShowDialog(false);
      setToast(error?.message || 'An error occurred. Please try again.');
      setToastSuccess(false);
      if (toastTimeout.current) clearTimeout(toastTimeout.current);
      toastTimeout.current = setTimeout(() => setToast(null), 5000);
    }    
  };

  const handleDialogCancel = () => {
    setShowDialog(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setfinancialSupportAmount(formatCurrency(e.target.value));
  };

  const getNumericValue = (amount: string) => {
    const numericString = amount.replace(/\D/g, "");
    return Number(numericString);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      {toast && <Toast message={toast} onClose={() => setToast(null)} success={toastSuccess} />}
      <ConfirmDialog
        open={showDialog}
        title="Confirm Registration"
        message={"Are you sure you want to submit this registration?\nPlease confirm all your details are correct."}
        onConfirm={handleDialogConfirm}
        onCancel={handleDialogCancel}
        submitting={submitStatus}
      />
      <form className="space-y-5 sm:space-y-6"
        onSubmit={handleSubmit}
      >
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* State Chapter */}
        <div>
          <label htmlFor="state-chapter" className="block text-sm font-medium text-gray-700 mb-1">State Chapter</label>
          <input
            type="text"
            id="state-chapter"
            name="state-chapter"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your state chapter"
            required
            value={stateChapter}
            onChange={(e) => setStateChapter(e.target.value)}
            disabled={noStateChapter}
          />
          <div className="flex items-center mt-2">
            <input type="checkbox" id="no-chapter" name="no-chapter" className="mr-2" 
            onChange={(e) => {
              setNoStateChapter(!noStateChapter)
              setStateChapter(e.target.checked ? 'No Chapter' : "")
            }}
            />
            <label htmlFor="no-chapter" className="text-sm text-gray-700">Not in any chapter</label>
          </div>
        </div>

        {/* Attendance */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Attendance</label>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
            <label className="flex items-center space-x-2">
              <input type="radio" id="will-attend" name="attendance" value="will-attend" required 
              onChange={(e) => setAttendance('Will Attend')}
              />
              <span className="text-sm text-gray-700">Will attend</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" id="will-not-attend" name="attendance" value="will-not-attend" 
              onChange={(e) => setAttendance('Will not Attend')}
              />
              <span className="text-sm text-gray-700">Will not attend</span>
            </label>
          </div>
        </div>

        {/* Town/State Coming From */}
        <div>
          <label htmlFor="coming-from" className="block text-sm font-medium text-gray-700 mb-1">Town/State coming from</label>
          <input
            type="text"
            id="coming-from"
            name="coming-from"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your town or state"
            value={comingFrom}
            onChange={(e) => setComingFrom(e.target.value)}
            required
          />
        </div>

        {/* Accommodation */}
        <div>
          <label htmlFor="accommodation" className="block text-sm font-medium text-gray-700 mb-1">Accommodation</label>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 space-y-2 sm:space-y-0">
            <label className="flex items-center space-x-2">
              <input type="radio" id="yes-accommodation" name="accommodation" value="yes-accommodation" required 
              onChange={(e) => setAccommodation('Yes')}
              />
              <span className="text-sm text-gray-700">Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" id="no-accommodation" name="accommodation" value="no-accommodation" 
              onChange={(e) => setAccommodation('No')}
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" id="self-arrangement-accommodation" name="accommodation" value="self-arrangement-accommodation" 
              onChange={(e) => setAccommodation('Self Arrangement')}
              />
              <span className="text-sm text-gray-700">Self Arrangement</span>
            </label>
          </div>
        </div>

        {/* Logistics */}
        <div>
          <label htmlFor="accommodation" className="block text-sm font-medium text-gray-700 mb-1">Logistics</label>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 space-y-2 sm:space-y-0">
            <label className="flex items-center space-x-2">
              <input type="radio" id="yes-logistics" name="logistics" value="yes-logistics" required 
              onChange={(e) => setLogistics('Yes')}
              />
              <span className="text-sm text-gray-700">Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" id="no-logistics" name="logistics" value="no-logistics" 
              onChange={(e) => setLogistics('No')}
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" id="self-arrangement-logistics" name="logistics" value="no-logistics" 
              onChange={(e) => setLogistics('Self Arrangement')}
              />
              <span className="text-sm text-gray-700">Self Arrangement</span>
            </label>
          </div>
        </div>

        {/* Financial Support */}
        <div className="space-y-2 sm:space-y-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">Financial Support</label>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 space-y-2 sm:space-y-0">
            <label className="flex items-center space-x-2">
              <input type="radio" id="cash" name="financial-support" value="cash" required
              onChange={(e) => setFinancialSupport('Cash')}
              />
              <span className="text-sm text-gray-700">Cash</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" id="pledge" name="financial-support" value="pledge" 
              onChange={(e) => setFinancialSupport('Pledge')}
              />
              <span className="text-sm text-gray-700">Pledge</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" id="none" name="financial-support" value="none" 
              onChange={(e) => {
                setFinancialSupport('None')
                setfinancialSupportAmount('')
              }}
              />
              <span className="text-sm text-gray-700">None</span>
            </label>
          </div>
          <input type="text" name="pledge-amount" placeholder="₦0" inputMode="numeric" className="w-full px-3 py-3 border border-gray-300 rounded-md" 
            disabled={financialSupport == 'None' || !financialSupport}
            value={financialSupportAmount}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

         {/* Note */}
        <div>
          <p className="text-sm text-blue-700 italic text-center bg-blue-50 rounded-lg py-2 px-4 border border-blue-100">
            <span className="font-semibold">NOTE:</span> All money pledged must be redeemed on or before two weeks to the date of the event.
          </p>
        </div>


        <button
          type="submit"
          className="w-full px-4 sm:px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 shadow-sm text-base sm:text-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

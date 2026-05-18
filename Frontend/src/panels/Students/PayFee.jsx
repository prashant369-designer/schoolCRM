import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  Banknote,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Download,
  FileText,
  GraduationCap,
  IndianRupee,
  LockKeyhole,
  ReceiptText,
  ShieldCheck,
  Smartphone,
  Wallet,
} from "lucide-react";

const feeItems = [
  {
    id: 1,
    title: "Tuition Fee",
    description: "April 2026 monthly fee",
    dueDate: "10 May 2026",
    amount: 4500,
    status: "Due",
  },
  {
    id: 2,
    title: "Transport Fee",
    description: "Bus route: Noida Sector 62",
    dueDate: "10 May 2026",
    amount: 1200,
    status: "Due",
  },
  {
    id: 3,
    title: "Library Fee",
    description: "Quarterly library maintenance",
    dueDate: "15 May 2026",
    amount: 350,
    status: "Upcoming",
  },
];

const recentPayments = [
  {
    id: "INV-2026-0412",
    title: "March 2026 Fee",
    date: "12 Apr 2026",
    amount: 5700,
    method: "UPI",
  },
  {
    id: "INV-2026-0310",
    title: "February 2026 Fee",
    date: "10 Mar 2026",
    amount: 5700,
    method: "Card",
  },
];

const paymentMethods = [
  {
    key: "upi",
    title: "UPI Payment",
    description: "Pay using PhonePe, Google Pay, Paytm or any UPI app",
    icon: Smartphone,
  },
  {
    key: "card",
    title: "Debit / Credit Card",
    description: "Visa, Mastercard, Rupay and major cards supported",
    icon: CreditCard,
  },
  {
    key: "netbanking",
    title: "Net Banking",
    description: "Pay directly from your bank account",
    icon: Banknote,
  },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function PayMyFeeUI() {
  const [selectedItems, setSelectedItems] = useState([1, 2]);
  const [paymentMethod, setPaymentMethod] = useState("upi");

  const selectedFeeItems = useMemo(
    () => feeItems.filter((item) => selectedItems.includes(item.id)),
    [selectedItems]
  );

  const subtotal = selectedFeeItems.reduce((total, item) => total + item.amount, 0);
  const platformFee = subtotal > 0 ? 18 : 0;
  const totalPayable = subtotal + platformFee;

  const handleSelectItem = (id) => {
    setSelectedItems((current) =>
      current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">  
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-start gap-4">
              <button className="mt-1 rounded-xl border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition hover:bg-slate-50">
                <ArrowLeft size={20} />
              </button>

              <div>
                <p className="mb-1 flex items-center gap-2 text-sm font-medium text-indigo-600">
                  <GraduationCap size={16} /> Student Fee Portal
                </p>
                <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  Pay My Fee
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Review your pending fee details and complete a secure payment.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Academic Session
              </p>
              <button className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-900">
                2026 - 2027 <ChevronDown size={16} />
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <InfoCard
              icon={Wallet}
              label="Total Due"
              value={formatCurrency(6050)}
              helper="Due before 10 May 2026"
            />
            <InfoCard
              icon={CheckCircle2}
              label="Paid This Year"
              value={formatCurrency(34200)}
              helper="6 successful payments"
            />
            <InfoCard
              icon={ReceiptText}
              label="Last Receipt"
              value="INV-2026-0412"
              helper="Paid on 12 Apr 2026"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-950">Pending Fee Details</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Select the fee items you want to pay today.
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-200">
                <CalendarDays size={14} /> 3 pending items
              </span>
            </div>

            <div className="space-y-3">
              {feeItems.map((item) => {
                const isSelected = selectedItems.includes(item.id);

                return (
                  <label
                    key={item.id}
                    className={`block cursor-pointer rounded-2xl border p-4 transition hover:border-indigo-300 hover:bg-indigo-50/40 ${
                      isSelected
                        ? "border-indigo-300 bg-indigo-50/70 ring-1 ring-indigo-200"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectItem(item.id)}
                          className="mt-1 h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        />

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold text-slate-950">{item.title}</h3>
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                item.status === "Due"
                                  ? "bg-red-50 text-red-700 ring-1 ring-red-200"
                                  : "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-slate-500">{item.description}</p>
                          <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                            <CalendarDays size={14} /> Due date: {item.dueDate}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xl font-bold text-slate-950 sm:text-right">
                        <IndianRupee size={18} /> {item.amount.toLocaleString("en-IN")}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-slate-950">Choose Payment Method</h2>
              <p className="mt-1 text-sm text-slate-500">
                Select your preferred mode of payment.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                const isActive = paymentMethod === method.key;

                return (
                  <button
                    key={method.key}
                    onClick={() => setPaymentMethod(method.key)}
                    className={`rounded-2xl border p-4 text-left transition hover:border-indigo-300 hover:bg-indigo-50/40 ${
                      isActive
                        ? "border-indigo-400 bg-indigo-50 ring-1 ring-indigo-200"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <span
                      className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl ${
                        isActive ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <Icon size={22} />
                    </span>
                    <h3 className="font-semibold text-slate-950">{method.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{method.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-950">Recent Payments</h2>
                <p className="mt-1 text-sm text-slate-500">Download old fee receipts.</p>
              </div>
              <button className="hidden rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:block">
                View All
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200">
              {recentPayments.map((payment, index) => (
                <div
                  key={payment.id}
                  className={`flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between ${
                    index !== recentPayments.length - 1 ? "border-b border-slate-200" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                      <FileText size={20} />
                    </span>
                    <div>
                      <h3 className="font-semibold text-slate-950">{payment.title}</h3>
                      <p className="text-sm text-slate-500">
                        {payment.id} • {payment.date} • {payment.method}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <p className="font-bold text-slate-950">{formatCurrency(payment.amount)}</p>
                    <button className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50">
                      <Download size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-6 lg:h-fit">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                <ReceiptText size={24} />
              </span>
              <div>
                <h2 className="text-lg font-bold text-slate-950">Payment Summary</h2>
                <p className="text-sm text-slate-500">Student ID: STU-2026-104</p>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                  alt="Student"
                  className="h-12 w-12 rounded-2xl object-cover"
                />
                <div>
                  <h3 className="font-semibold text-slate-950">Rahul Sharma</h3>
                  <p className="text-sm text-slate-500">Class 10-A • Roll No. 24</p>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-3 border-b border-slate-200 pb-5">
              {selectedFeeItems.length > 0 ? (
                selectedFeeItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-slate-500">{item.title}</span>
                    <span className="font-semibold text-slate-950">{formatCurrency(item.amount)}</span>
                  </div>
                ))
              ) : (
                <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
                  No fee item selected. Please select at least one fee item to continue.
                </p>
              )}
            </div>

            <div className="mt-5 space-y-3 border-b border-slate-200 pb-5">
              <SummaryRow label="Subtotal" value={formatCurrency(subtotal)} />
              <SummaryRow label="Platform Fee" value={formatCurrency(platformFee)} />
              <SummaryRow label="Late Fee" value={formatCurrency(0)} />
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-600">Total Payable</span>
              <span className="text-2xl font-bold text-slate-950">{formatCurrency(totalPayable)}</span>
            </div>

            <button
              disabled={totalPayable === 0}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
            >
              <LockKeyhole size={18} /> Pay Securely
            </button>

            <div className="mt-4 flex items-start gap-2 rounded-2xl bg-emerald-50 p-3 text-sm text-emerald-800 ring-1 ring-emerald-100">
              <ShieldCheck className="mt-0.5 shrink-0" size={18} />
              <p>
                Your payment is protected with secure gateway encryption. Receipt will be generated after successful payment.
              </p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

function InfoCard({ icon: Icon, label, value, helper }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">{value}</h2>
          <p className="mt-1 text-xs text-slate-500">{helper}</p>
        </div>
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <Icon size={22} />
        </span>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-slate-950">{value}</span>
    </div>
  );
}

import React, { useState, useEffect } from 'react';

const ActivityPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white border border-green-300 p-6">

        <div className="grid grid-cols-3 gap-6">

          {/* LEFT SIDE */}
          <div className="col-span-2 space-y-6">

            {/* Top Row */}
            <div className="flex justify-between items-center">
              <div className="border border-green-400 px-4 py-1">
                Your Investments
              </div>
              <div className="border border-green-400 px-3 py-1 text-sm">
                Dec-12-2025, Sun, 12:32
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-5 gap-4 text-sm">
              <div>
                <label>Investment type</label>
                <input className="w-full border border-green-300 p-1 mt-1" />
              </div>
              <div>
                <label>Amount</label>
                <input className="w-full border border-green-300 p-1 mt-1" />
              </div>
              <div>
                <label>Duration</label>
                <input className="w-full border border-green-300 p-1 mt-1" />
              </div>
              <div>
                <label>Return rate</label>
                <input className="w-full border border-green-300 p-1 mt-1" />
              </div>
              <div>
                <label>Currency</label>
                <input className="w-full border border-green-300 p-1 mt-1" />
              </div>
            </div>

            {/* Calculator Title */}
            <div className="border border-green-400 inline-block px-4 py-2">
              Financial Calculator’s
            </div>

            {/* Buttons */}
            <div className="flex gap-6">
              <button className="border border-green-400 px-8 py-2 hover:bg-green-100">
                Deposit
              </button>
              <button className="border border-green-400 px-8 py-2 hover:bg-green-100">
                Withdraw
              </button>
            </div>

          </div>

          {/* RIGHT SIDE RECTANGLE */}
          <div className="flex justify-center items-center">
            <div className="w-72 h-48 border border-green-400 flex items-center justify-center text-center text-sm p-4">
              Ko bhi investment se <br />
              related quote ya image
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}




export default ActivityPage;
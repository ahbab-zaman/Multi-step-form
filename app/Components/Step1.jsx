import React from "react";

export default function Step1({register, errors}) {
  return (
    <div className="space-y-4">
      {/* ... Previous Personal Information content unchanged ... */}
      <div>
        <label className="block font-semibold text-base-900">
          Full Name
        </label>
        <input
          {...register("fullName")}
          className={`mt-1 block w-full py-2 rounded-md border-[1px] bg-base-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
            errors.fullName ? "border-red-500 " : ""
          }`}
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
        )}
      </div>
      <div>
        <label className="block font-semibold text-base-900">Email</label>
        <input
          {...register("email")}
          className={`mt-1 block w-full py-2 rounded-md border-[1px] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label className="block font-semibold text-base-900">
          Phone Number
        </label>
        <input
          {...register("phoneNumber")}
          className={`mt-1 block w-full py-2 rounded-md border-[1px] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
            errors.phoneNumber ? "border-red-500" : ""
          }`}
        />
        {errors.phoneNumber && (
          <p className="mt-1 text-sm text-red-600">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>
    </div>
  );
}

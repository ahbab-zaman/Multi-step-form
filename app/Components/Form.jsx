"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      phone: "",
      message: "",
    },
    mode: "onChange",
  });

  // Navigation functions
  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Form submission
  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    // Add your submission logic here
  };

  // Step components array
  const steps = [
    {
      title: "Personal Information",
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              })}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "Address Details",
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              {...register("address", { required: "Address is required" })}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                errors.address ? "border-red-500" : ""
              }`}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">
                {errors.address.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              {...register("city", { required: "City is required" })}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                errors.city ? "border-red-500" : ""
              }`}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "Additional Information",
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Please enter a valid 10-digit phone number",
                },
              })}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                errors.phone ? "border-red-500" : ""
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              {...register("message")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows="3"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {/* Progress indicator */}
      <div className="flex justify-between mb-6">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step > index
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>

      {/* Form content */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-xl font-bold mb-4">{steps[step - 1].title}</h2>
        {steps[step - 1].content}

        {/* Navigation buttons */}
        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className={`px-4 py-2 rounded-md ${
              step === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            Previous
          </button>

          {step === 3 ? (
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Submit
            </button>
          ) : (
            <button
              type="button"
              onClick={nextStep}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { Bounce, toast } from "react-toastify";

// Define validation schema with Zod (unchanged)
const schema = z
  .object({
    fullName: z.string().min(1, "Full Name is required"),
    email: z.string().email("Invalid email format").min(1, "Email is required"),
    phoneNumber: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .regex(/^\d+$/, "Phone number must contain only numbers"),
    streetAddress: z.string().min(1, "Street Address is required"),
    city: z.string().min(1, "City is required"),
    zipCode: z
      .string()
      .min(5, "Zip Code must be at least 5 digits")
      .regex(/^\d+$/, "Zip Code must contain only numbers"),
    username: z.string().min(4, "Username must be at least 4 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
    getValues,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      streetAddress: "",
      city: "",
      zipCode: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  // Navigation functions
  const nextStep = async () => {
    const fieldsToValidate = {
      1: ["fullName", "email", "phoneNumber"],
      2: ["streetAddress", "city", "zipCode"],
      3: ["username", "password", "confirmPassword"],
    };

    // Only validate and increment step if we're on steps 1-3
    if (step <= 3) {
      const isValid = await trigger(fieldsToValidate[step]);
      if (isValid) {
        setStep(step + 1); // Move to the next step (up to step 4)
      }
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Form submission
  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };
  const handleSubmitForm = () => {
    reset();
    toast("🦄 Wow so easy!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    setStep(1);
  };

  // Summary component
  const Summary = () => {
    const values = getValues();
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Review Your Information</h3>
        <div className="space-y-2">
          <p>
            <strong>Full Name:</strong> {values.fullName}
          </p>
          <p>
            <strong>Email:</strong> {values.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {values.phoneNumber}
          </p>
          <p>
            <strong>Street Address:</strong> {values.streetAddress}
          </p>
          <p>
            <strong>City:</strong> {values.city}
          </p>
          <p>
            <strong>Zip Code:</strong> {values.zipCode}
          </p>
          <p>
            <strong>Username:</strong> {values.username}
          </p>
        </div>
      </div>
    );
  };

  // Step components array
  const steps = [
    {
      title: "Personal Information",
      content: <Step1 register={register} errors={errors} />,
    },
    {
      title: "Address Details",
      content: <Step2 register={register} errors={errors} />,
    },
    {
      title: "Account Setup",
      content: <Step3 register={register} errors={errors} />,
    },
    {
      title: "Review & Submit",
      content: <Summary />,
    },
  ];

  const stepVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
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
        <motion.div
          key={step} // Key ensures animation triggers on step change
          variants={stepVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {steps[step - 1].content}
        </motion.div>

        {/* Navigation buttons */}
        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className={`px-4 py-2 rounded-md transition-transform duration-200 ease-in-out transform ${
              step === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95"
            }`}
          >
            Previous
          </button>

          {step === 4 ? (
            <button
              onClick={handleSubmitForm}
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Submit
            </button>
          ) : (
            <button
              type="button"
              onClick={nextStep}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-transform duration-200 ease-in-out transform active:scale-95"
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

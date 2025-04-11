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
import ThemeToggle from "./Theme";
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
    toast("Form successfully submitted 📑", {
      position: "top-right",
      autoClose: 3000,
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
    <>
      <div className="h-screen max-w-md mx-auto my-4">
        <div className="mb-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Validation Form</h2>
          </div>
          <div>
            <ThemeToggle />
          </div>
        </div>
        <div className="  p-6 bg-base-100 rounded-lg shadow-xl border-2">
          {/* Progress indicator */}
          <div className="flex justify-between mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step > index
                    ? "bg-[#222] text-white font-semibold"
                    : "bg-gray-200 text-gray-600 font-semibold"
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
            <div className="mt-6 w-full flex justify-between items-center">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className={`px-4 py-2 rounded-md ${
                  step === 1
                    ? "bg-gray-300 font-semibold cursor-not-allowed"
                    : "bg-[#222] hover:bg-[#d8d7d7] hover:text-[#222] text-[#fff] hover:border-[#222] hover:transition-all font-semibold hover:duration-300 cursor-pointer"
                }`}
              >
                Previous
              </button>

              {step === 4 ? (
                <button
                  onClick={handleSubmitForm}
                  type="submit"
                  className="px-4 py-2 bg-[#222] hover:bg-[#d8d7d7] hover:text-[#222] text-[#fff] rounded-md hover:transition-all hover:border-[#222] font-semibold hover:duration-300 cursor-pointer"
                >
                  Submit
                </button>
              ) : (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 bg-[#222] hover:bg-[#d8d7d7] hover:text-[#222] text-[#fff] rounded-md hover:transition-all hover:border-[#222] font-semibold hover:duration-300 cursor-pointer"
                >
                  Next
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MultiStepForm;

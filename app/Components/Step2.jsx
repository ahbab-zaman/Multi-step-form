export default function Step2({register, errors}) {
  return (
    <div className="space-y-4">
      {/* ... Previous Address Details content unchanged ... */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Street Address
        </label>
        <input
          {...register("streetAddress")}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
            errors.streetAddress ? "border-red-500" : ""
          }`}
        />
        {errors.streetAddress && (
          <p className="mt-1 text-sm text-red-600">
            {errors.streetAddress.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">City</label>
        <input
          {...register("city")}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
            errors.city ? "border-red-500" : ""
          }`}
        />
        {errors.city && (
          <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Zip Code
        </label>
        <input
          {...register("zipCode")}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
            errors.zipCode ? "border-red-500" : ""
          }`}
        />
        {errors.zipCode && (
          <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>
        )}
      </div>
    </div>
  );
}

export default function Step3({ register, errors }) {
  return (
    <div className="space-y-4">
      {/* ... Previous Account Setup content unchanged ... */}
      <div>
        <label className="block font-semibold text-base-900">Username</label>
        <input
          {...register("username")}
          className={`mt-1 block w-full py-2 rounded-md border-[1px] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
            errors.username ? "border-red-500" : ""
          }`}
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
        )}
      </div>
      <div>
        <label className="block font-semibold text-base-900">Password</label>
        <input
          type="password"
          {...register("password")}
          className={`mt-1 block py-2 w-full font-semibold rounded-md border-[1px] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
            errors.password ? "border-red-500" : ""
          }`}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>
      <div>
        <label className="block font-semibold text-base-900">
          Confirm Password
        </label>
        <input
          type="password"
          {...register("confirmPassword")}
          className={`mt-1 block w-full py-2 rounded-md border-[1px] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
            errors.confirmPassword ? "border-red-500" : ""
          }`}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
    </div>
  );
}

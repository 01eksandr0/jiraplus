import { forwardRef, InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  placeholder?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, IProps>(function Input(
  { type, placeholder, error, className, ...props },
  ref
) {
  return (
    <div className="relative">
      <input
        className={
          "py-2 px-3 h-[40px] border  block w-full rounded-lg text-sm outline-none focus:border-emerald-700 focus:border-2 focus:ring-emerald-700 disabled:opacity-50 disabled:pointer-events-none " +
          className +
          (error ? " border-red-500 border-2" : " border-gray-500")
        }
        type={type}
        ref={ref}
        placeholder={placeholder}
        {...props}
      />
      {error && (
        <span className="absolute text-[12px] text-red-500">{error}</span>
      )}
    </div>
  );
});

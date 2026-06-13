import AdminImageFileInput from "./AdminImageFileInput";

export default function AdminCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-[#08080c] p-6 shadow-[0_0_34px_rgba(255,20,147,0.08)] md:p-7">
      <div className="mb-6">
        <h2 className="text-[22px] font-black uppercase tracking-[0.08em] text-white">
          {title}
        </h2>

        {description ? (
          <p className="mt-3 text-[13px] font-semibold leading-[1.8] text-white/45">
            {description}
          </p>
        ) : null}
      </div>

      {children}
    </div>
  );
}

export function AdminInput({
  label,
  name,
  placeholder,
  type = "text",
  required = false,
  defaultValue,
}: {
  label: string;
  name?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  defaultValue?: string | number;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.18em] text-white/52">
        {label}
      </span>

      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="h-[48px] w-full rounded-[14px] border border-white/10 bg-black px-4 text-[14px] font-semibold text-white outline-none transition placeholder:text-white/24 focus:border-[#ff1493]/70"
      />
    </label>
  );
}

export function AdminTextarea({
  label,
  name,
  placeholder,
  rows = 6,
  required = false,
  defaultValue,
}: {
  label: string;
  name?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.18em] text-white/52">
        {label}
      </span>

      <textarea
        name={name}
        rows={rows}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full resize-none rounded-[14px] border border-white/10 bg-black px-4 py-4 text-[14px] font-semibold leading-[1.8] text-white outline-none transition placeholder:text-white/24 focus:border-[#ff1493]/70"
      />
    </label>
  );
}

export function AdminSelect({
  label,
  name,
  options,
  required = false,
  defaultValue = "",
}: {
  label: string;
  name?: string;
  options: Array<string | { label: string; value: string }>;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.18em] text-white/52">
        {label}
      </span>

      <select
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="h-[48px] w-full rounded-[14px] border border-white/10 bg-black px-4 text-[14px] font-semibold text-white outline-none transition focus:border-[#ff1493]/70"
      >
        <option value="" disabled>
          선택
        </option>

        {options.map((option) => {
          const value = typeof option === "string" ? option : option.value;
          const label = typeof option === "string" ? option : option.label;

          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
    </label>
  );
}

export function AdminFileInput({
  label,
  name,
  targetWidth = 1200,
  targetHeight = 1200,
  mode = "cover",
}: {
  label: string;
  name?: string;
  targetWidth?: number;
  targetHeight?: number;
  mode?: "cover" | "contain";
}) {
  return (
    <AdminImageFileInput
      label={label}
      name={name}
      targetWidth={targetWidth}
      targetHeight={targetHeight}
      mode={mode}
    />
  );
}

export function AdminButton({
  children,
  variant = "primary",
  type = "button",
}: {
  children: React.ReactNode;
  variant?: "primary" | "danger" | "ghost";
  type?: "button" | "submit";
}) {
  const className =
    variant === "primary"
      ? "bg-[#ff1493] text-black hover:shadow-[0_0_28px_rgba(255,20,147,0.35)]"
      : variant === "danger"
        ? "border border-red-500/50 bg-red-500/10 text-red-300 hover:bg-red-500 hover:text-white"
        : "border border-white/12 bg-white/[0.03] text-white/70 hover:border-[#ff1493]/70 hover:text-white";

  return (
    <button
      type={type}
      className={`h-[46px] rounded-[14px] px-5 text-[11px] font-black uppercase tracking-[0.18em] transition ${className}`}
    >
      {children}
    </button>
  );
}
const VARIANTS = {
  primary:
    "bg-primary text-white hover:bg-primary-dark active:bg-primary-dark shadow-[0_1px_2px_rgba(39,52,105,0.16)]",
  secondary:
    "bg-white text-text border border-border hover:border-primary/40 hover:bg-accent-soft",
  ghost:
    "bg-transparent text-primary hover:bg-accent-soft",
};

const SIZES = {
  sm: "h-9 px-4 text-[13px] gap-1.5",
  md: "h-11 px-5 text-[14px] gap-2",
  lg: "h-12 px-6 text-[15px] gap-2",
};

export default function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  as: Tag = "button",
  ...props
}) {
  return (
    <Tag
      {...props}
      className={`
        inline-flex items-center justify-center
        rounded-lg font-semibold
        transition-all duration-200 ease-out
        disabled:opacity-50 disabled:pointer-events-none
        ${SIZES[size]}
        ${VARIANTS[variant]}
        ${className}
      `}
    >
      {children}
    </Tag>
  );
}

import { useClickAnimation } from "../../../utils/animations";

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
  className = "",
  fullWidth = false,
  loading = false,
  withAnimation = false,
  animationDelay = 1000,
  ...props
}) => {
  // Use click animation if enabled
  const clickAnimation = useClickAnimation(onClick, animationDelay);

  const baseClasses =
    "rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-global-1 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "btn-primary-animated text-white focus:ring-blue-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    accent:
      "bg-[#f4b631] text-global-1 hover:bg-yellow-500 focus:ring-yellow-500",
    outline:
      "border border-[#327dd6] text-[#327dd6] hover:bg-blue-50/10 focus:ring-blue-500",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl",
  };

  const isLoading = loading || (withAnimation && clickAnimation.isLoading);
  const handleClick = withAnimation ? clickAnimation.handleClick : onClick;
  const animationClasses = withAnimation ? clickAnimation.className : "";

  return (
    <button
      type={type}
      onClick={disabled || isLoading ? undefined : handleClick}
      disabled={disabled || isLoading}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${isLoading ? "opacity-70 cursor-wait" : ""}
        ${animationClasses}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          {withAnimation && clickAnimation.isLoading
            ? "Processing..."
            : "Loading..."}
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;

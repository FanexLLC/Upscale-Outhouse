import React, { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "phone";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsAnchor = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm min-h-[36px]",
  md: "px-6 py-3 text-body min-h-[48px]",
  lg: "px-8 py-4 text-lg min-h-[56px]",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    "relative overflow-hidden",
    "bg-gradient-to-r from-gold-primary via-gold-light to-gold-primary",
    "text-bg-primary font-semibold",
    "rounded-lg",
    "transition-all duration-300 ease-out",
    "hover:scale-[1.02] hover:shadow-gold",
    "active:scale-[0.98]",
  ].join(" "),
  secondary: [
    "border border-gold-primary text-gold-primary",
    "rounded-lg bg-transparent",
    "transition-all duration-300 ease-out",
    "hover:bg-gold-primary hover:text-bg-primary",
    "active:scale-[0.98]",
  ].join(" "),
  ghost: [
    "text-gold-primary bg-transparent",
    "relative",
    "transition-all duration-300 ease-out",
    "after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px]",
    "after:bg-gold-primary after:transition-all after:duration-300",
    "hover:after:w-full",
  ].join(" "),
  phone: [
    "inline-flex items-center gap-2",
    "text-gold-primary font-semibold",
    "rounded-lg border border-gold-dark",
    "transition-all duration-300 ease-out",
    "hover:bg-gold-primary hover:text-bg-primary",
    "active:scale-[0.98]",
  ].join(" "),
};

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
      clipRule="evenodd"
    />
  </svg>
);

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...rest }, ref) => {
    const classes = `inline-flex items-center justify-center font-body tracking-wide cursor-pointer ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    // Shimmer overlay for primary variant
    const shimmerOverlay =
      variant === "primary" ? (
        <span
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
            animation: "gold-shimmer 3s linear infinite",
          }}
          aria-hidden="true"
        />
      ) : null;

    if ("href" in rest && rest.href) {
      const { href, ...anchorProps } = rest as ButtonAsAnchor;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...anchorProps}
        >
          {variant === "phone" && <PhoneIcon />}
          {shimmerOverlay}
          <span className="relative z-10">{children}</span>
        </a>
      );
    }

    const buttonProps = rest as Omit<ButtonAsButton, "href" | keyof ButtonBaseProps>;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...buttonProps}
      >
        {variant === "phone" && <PhoneIcon />}
        {shimmerOverlay}
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

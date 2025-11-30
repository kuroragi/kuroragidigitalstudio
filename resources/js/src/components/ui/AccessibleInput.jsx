import React from "react";
import { useAccessibleId } from "../../hooks/useAccessibility";

const AccessibleInput = ({
    label,
    type = "text",
    value,
    onChange,
    onBlur,
    placeholder,
    required = false,
    disabled = false,
    error,
    helperText,
    className = "",
    inputClassName = "",
    ...props
}) => {
    const id = useAccessibleId("input");
    const errorId = useAccessibleId("error");
    const helperTextId = useAccessibleId("helper");

    const baseInputClasses = `
        w-full px-4 py-2 bg-primary-bg border rounded-lg text-primary-text
        placeholder-muted-text transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue
        disabled:opacity-50 disabled:cursor-not-allowed
        ${
            error
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-subtle-highlight hover:border-primary-blue/50"
        }
    `;

    const ariaDescribedBy =
        [error ? errorId : null, helperText ? helperTextId : null]
            .filter(Boolean)
            .join(" ") || undefined;

    return (
        <div className={`space-y-1 ${className}`}>
            {label && (
                <label
                    htmlFor={id}
                    className={`block text-sm font-medium text-primary-text ${
                        required
                            ? "after:content-['*'] after:ml-0.5 after:text-red-500"
                            : ""
                    }`}
                >
                    {label}
                </label>
            )}

            <div className="relative">
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    aria-describedby={ariaDescribedBy}
                    aria-invalid={error ? "true" : "false"}
                    aria-required={required}
                    className={`${baseInputClasses} ${inputClassName}`}
                    {...props}
                />

                {/* Error icon */}
                {error && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg
                            className="h-5 w-5 text-red-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                )}
            </div>

            {/* Error message */}
            {error && (
                <p
                    id={errorId}
                    className="text-sm text-red-500 flex items-center gap-1"
                    role="alert"
                    aria-live="polite"
                >
                    <svg
                        className="h-4 w-4 flex-shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                    {error}
                </p>
            )}

            {/* Helper text */}
            {helperText && !error && (
                <p id={helperTextId} className="text-sm text-muted-text">
                    {helperText}
                </p>
            )}
        </div>
    );
};

const AccessibleTextarea = ({
    label,
    value,
    onChange,
    onBlur,
    placeholder,
    rows = 4,
    required = false,
    disabled = false,
    error,
    helperText,
    className = "",
    textareaClassName = "",
    ...props
}) => {
    const id = useAccessibleId("textarea");
    const errorId = useAccessibleId("error");
    const helperTextId = useAccessibleId("helper");

    const baseTextareaClasses = `
        w-full px-4 py-2 bg-primary-bg border rounded-lg text-primary-text
        placeholder-muted-text transition-colors duration-200 resize-vertical
        focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue
        disabled:opacity-50 disabled:cursor-not-allowed
        ${
            error
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-subtle-highlight hover:border-primary-blue/50"
        }
    `;

    const ariaDescribedBy =
        [error ? errorId : null, helperText ? helperTextId : null]
            .filter(Boolean)
            .join(" ") || undefined;

    return (
        <div className={`space-y-1 ${className}`}>
            {label && (
                <label
                    htmlFor={id}
                    className={`block text-sm font-medium text-primary-text ${
                        required
                            ? "after:content-['*'] after:ml-0.5 after:text-red-500"
                            : ""
                    }`}
                >
                    {label}
                </label>
            )}

            <textarea
                id={id}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                rows={rows}
                required={required}
                disabled={disabled}
                aria-describedby={ariaDescribedBy}
                aria-invalid={error ? "true" : "false"}
                aria-required={required}
                className={`${baseTextareaClasses} ${textareaClassName}`}
                {...props}
            />

            {/* Error message */}
            {error && (
                <p
                    id={errorId}
                    className="text-sm text-red-500 flex items-center gap-1"
                    role="alert"
                    aria-live="polite"
                >
                    <svg
                        className="h-4 w-4 flex-shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                    {error}
                </p>
            )}

            {/* Helper text */}
            {helperText && !error && (
                <p id={helperTextId} className="text-sm text-muted-text">
                    {helperText}
                </p>
            )}
        </div>
    );
};

export { AccessibleInput, AccessibleTextarea };

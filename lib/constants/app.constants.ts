/**
 * Application-wide constants
 */

export const APP_NAME = "Expert Dashboard";
export const APP_VERSION = "1.0.0";
export const APP_DESCRIPTION =
  "Professional dashboard for analytics and user management";

/**
 * Navigation constants
 */
export const NAVIGATION_ROUTES = {
  HOME: "/",
  DASHBOARD: "/",
  USERS: "/users",
  USER_DETAIL: (id: string) => `/users/${id}`,
  PAYMENTS: "/payments",
  SETTINGS: "/settings",
  PROFILE: "/profile",
} as const;

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  USERS: "/users",
  PAYMENTS: "/payments",
  ANALYTICS: "/analytics",
  STATS: "/stats",
} as const;

/**
 * Default pagination settings
 */
export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

/**
 * User roles and permissions
 */
export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
  MODERATOR: "moderator",
} as const;

export const USER_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  SUSPENDED: "suspended",
} as const;

/**
 * Payment statuses and methods
 */
export const PAYMENT_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  COMPLETED: "completed",
  FAILED: "failed",
} as const;

export const PAYMENT_METHODS = {
  CREDIT_CARD: "credit_card",
  BANK_TRANSFER: "bank_transfer",
  PAYPAL: "paypal",
  CRYPTOCURRENCY: "cryptocurrency",
} as const;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  SERVER_ERROR: "Server error. Please try again later.",
  VALIDATION_ERROR: "Please check your input.",
  NOT_FOUND: "Resource not found.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  UNKNOWN_ERROR: "An unknown error occurred.",
} as const;

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  CREATED: "Successfully created.",
  UPDATED: "Successfully updated.",
  DELETED: "Successfully deleted.",
  SAVED: "Successfully saved.",
  LOADED: "Successfully loaded.",
} as const;

/**
 * Validation rules
 */
export const VALIDATION = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  },
  PHONE: {
    PATTERN: /^[\d\s\-\+\(\)]+$/,
  },
} as const;

/**
 * Timeout constants (in milliseconds)
 */
export const TIMEOUTS = {
  DEFAULT: 30000,
  SHORT: 5000,
  MEDIUM: 10000,
  LONG: 60000,
} as const;

/**
 * Cache durations (in seconds)
 */
export const CACHE_DURATIONS = {
  SHORT: 60,
  MEDIUM: 300,
  LONG: 3600,
  VERY_LONG: 86400,
} as const;

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 16;

export function validateLoginCredentials(email: string, password: string): ValidationResult {
  const errors: string[] = [];

  if (!EMAIL_PATTERN.test(email)) {
    errors.push("Email must be a valid email address.");
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    errors.push(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
  }

  return { valid: errors.length === 0, errors };
}

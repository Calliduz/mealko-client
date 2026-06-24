/**
 * Translates a Firebase Auth error code into a user-friendly message.
 */
export function getAuthErrorMessage(error: any): string {
  if (!error) return 'An unexpected error occurred.';

  const code = error.code || (error.message && typeof error.message === 'string' ? error.message : '');

  // Handle common Firebase Auth error codes
  if (code.includes('auth/invalid-credential') || code.includes('invalid-credential')) {
    return 'Incorrect email or password. Please check your credentials and try again.';
  }
  if (code.includes('auth/wrong-password') || code.includes('wrong-password')) {
    return 'Incorrect password. Please try again.';
  }
  if (code.includes('auth/user-not-found') || code.includes('user-not-found')) {
    return 'No account found with this email address.';
  }
  if (code.includes('auth/invalid-email') || code.includes('invalid-email')) {
    return 'Please enter a valid email address.';
  }
  if (code.includes('auth/email-already-in-use') || code.includes('email-already-in-use')) {
    return 'This email address is already registered. Try logging in instead.';
  }
  if (code.includes('auth/weak-password') || code.includes('weak-password')) {
    return 'Password is too weak. It must be at least 6 characters long.';
  }
  if (code.includes('auth/too-many-requests') || code.includes('too-many-requests')) {
    return 'Too many login attempts. This account has been temporarily disabled. Please try again later.';
  }
  if (code.includes('auth/network-request-failed') || code.includes('network-request-failed')) {
    return 'Network connection failed. Please check your internet connection and try again.';
  }

  // Fallback to error message, or generic message
  return error.message || 'Authentication failed. Please try again.';
}

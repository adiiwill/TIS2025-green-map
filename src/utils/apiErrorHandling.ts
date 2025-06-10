export const getErrorMessage = (status: number) => {
  const errorMap = {
    400: 'Please check your input',
    401: 'Invalid credentials',
    403: 'Access denied',
    404: 'Not found',
    409: 'Email already exists',
    422: 'Please check your input',
    429: 'Too many attempts, try again later',
    500: 'Server error, try again later',
    502: 'Service temporarily unavailable',
    503: 'Service temporarily unavailable'
  }

  return errorMap[status as keyof typeof errorMap] || 'Something went wrong'
}

class DataStoreError extends Error {
  constructor(detail, message, statusCode) {
    super(message);

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);

    // Assigning default message if none is given
    this.message = message || 'Bad Gateway';
    this.detail = detail || 'Data retrieval/update error';

    // Using 502 as default value if none is specified.
    this.status = statusCode || 502;
  }
}

module.exports = DataStoreError;

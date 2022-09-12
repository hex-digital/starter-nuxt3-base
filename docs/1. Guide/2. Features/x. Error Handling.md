# Guide > Features > Error Handling

There is a CustomError class available at `~/exceptions/CustomError.ts`. When throwing an error that will be handled on
the same application layer (e.g. component, composable, service, repository, etc), you should throw a relevant error
type, such as SyntaxError.

When throwing an error, that won't be handled on the same application layer (e.g. component, composable, service,
API, etc), you should create a new error class that extends the CustomError, and throw this.

It's a common pattern to catch lower level errors, and wrap them into a higher level error, such as catching SyntaxError
and RangeErrors, and wrapping them into an AddToCartError, for example.

These errors will often bubble to the UI layer, where they can be handled appropriately. In these cases, it's also
useful to log the error. [Learn about logging here](x.%20Logging.md).

## Application Monitoring

> If/When Application Monitoring is added to this project, it can be documented under this title. E.G. Sentry, LogRocket, HotJar, etc.

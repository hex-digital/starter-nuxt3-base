# Guide > Directory Structure > General

Write up required...

## Constants

We use Constants throughout the application in place of magic strings and other values.

This directory is for storing global constants that aren't related to any specific app module. For those
that are related to an app module, they should go under a `constants` directory in the relevant module, under `~/modules`.

> 👉 Read more in [Guide > Features > Constants](../2.%20Features/x.%20Constants.md)

## Exceptions

We use Exceptions throughout the application to help us handle errors and show the right messages and error codes to the user.

This directory is for storing global Exceptions that aren't related to any specific app module. For those
that are related to an app module, they should go under an `exceptions` directory in the relevant app module, under `~/modules`.

> 👉 Read more in [Guide > Features > Error Handling](../2.%20Features/x.%20Error%20Handling.md)


## Helpers

The Utils directory (short for Utilities) is for any global utilities that our application needs.

This could be for turning a Title into a Slug, adding or removing VAT from a price, or adding Cache-Control headers.

Some App Modules in the `~/modules` directory may bring along their own utilities that are specific to their module.

## Types

This directory contains typescript type files only. Ones that are global to the application,
and not part of a specific feature, would usually live here.

If you have types that are more specific to your [app's modules](../../../modules), you may find yourself
adding a `types` directory under the feature, with feature-specific types in there instead.

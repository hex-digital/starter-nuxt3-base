# Guide > Directory Structure > General

The [General directory](../../../src/general) houses code that isn't specific to a domain module. This can include components, composables,
constants, exceptions, helpers, services, types and more.

> The Concept's section explains the [difference between General and Modules](../1.%20Concepts/2.%20Application%20Structure.md#general-vs-modules)
and may be helpful to read first, if you haven't already.

The General directory is set up with the following structure. Each is then explained below.

- Components
- Composables
- Constants
- Exceptions
- Features
- Helpers
- Services
- Types

Almost all code relating to UI, Services or Middleware that does not belong to a specific domain module will live in the
`~/general` directory. This could include Base Components, Composables for SEO, general Factories, helpers, etc.

### General Feature Co-location

Most code under General is co-located by type, because it is often a single file, e.g. `BaseButton.vue`.

However, some code under General may have enough files to also be better off co-located. For example, the application's Modals feature
has two components, a composable, and a types file. To make this easier to use, these files are co-located under `~/general/features/Modals`.

Other features that would benefit from co-location can live under this [`~/general/features`](../../../src/general/features) 
directory. It is not required, but it often helps with maintainability of these features.

## General Sub-Directory Structure

### Components

Our general components are split into four types:

- Base
- Dev
- Partial
- Prefab
- ...Other directories or files to be added as required

#### Base Components are dumb and presentational only

Base Components do not hold any application logic or application state within them. They should be completely decoupled
from both application knowledge and domain knowledge. This means they are "dumb" or "presentational" components.
They are prefixed with the word "Base" to show this.

Base Components can be extended to be more specific. This is common within a Module, for example, creating a ProfileButton
from a BaseButton. The naming shows that the ProfileButton may be part of the User or Profile module, and will likely
have some application logic or domain knowledge linking it to that data.

#### Dev Components are useful only during development

These components might output stylised errors in a `<pre><code></code></pre>` block, or display warnings or show logs
only when in development mode. They're often temporary, stripped out for Production, or otherwise have no effect when
the app is deployed to a Production environment.

#### Partial Components

Partials, or Partial Components, are usually part of a screen or layout. They are often configured with props so that they
can look different in different places, but tend to make up a section on a page.

Common examples may include PartialHeader and PartialFooter.

#### Prefab Components

Prefabs, or Prefabricated Components, are those that do not take any props, and can be dropped anywhere on the site.
They always look the same, and are used specifically for that purpose.

For example, if we want to create a standardised Newsletter Signup section on our website, and have it always look
the same across the website, we may use a `prefabs/NewsletterSignup.vue` component. The inputs for this would be
totally self-contained, e.g. all the text and content would be defined inside the component.

It can then be dropped anywhere on the site, and will always look exactly the same. It may use a Partial as a child
component, but having it all in one place allows for quick updating of the Prefab across the site.

#### Other Sub-directories

These sub-directories are not the be-all-end-all, and more can be added as required. This is just a guideline to be extended
as the needs of the project evolve.

### Composables

General Composables that do not belong to a specific domain module live here. This could be composables to help with UI, with
SEO, with input events, or anything else required.

### Constants

We use Constants throughout the application in place of magic strings and other values.

This directory is for storing global constants that aren't related to any specific app module. For those
that are related to an app module, they should go under a `constants` directory in the relevant module, under `~/modules`.

> 👉 Read more in [Guide > Features > Constants](../2.%20Features/x.%20Constants.md)

### Exceptions

We use Exceptions throughout the application to help us handle errors and show the right messages and error codes to the user.

This directory is for storing general Exceptions that aren't related to any specific domain module. For those
that are related to an app module, they should go under an `exceptions` directory in the relevant app module, under `~/modules`.

> 👉 Read more in [Guide > Features > Error Handling](../2.%20Features/x.%20Error%20Handling.md)

### Features

While the rest of the general directories co-locate code by type, this directory is for co-locating code by feature.

Each directory within [`~/general/features`](../../../src/general/features) may contain these same directories again 
(components, composables, helpers, etc), but allows us to co-locate that code for the feature. This is contrasted with
Modules, which are co-locating code by domain design, these features are co-located by application functionality.

This directory is not required if you would prefer to co-locate all general code by type, but it does serve as a great
medium for when a particular feature has grown large enough that co-locating its files reduces cognitive load when working
on that feature.

### Helpers

The Helpers directory is for any general helpers that our application needs.

This could be for turning a Title into a Slug, adding or removing VAT from a price, or adding Cache-Control headers.

Some App Modules in the [`~/modules`](../../../src/modules) directory may bring along their own helpers that are specific to their module, and so would be found
under that relevant module.

### Services

The Services directory is the home of any general services for our application.

These services can wrap up general application logic into easy-to-use composables or classes, often also handling
error logic with a consistent API. They're more common under the Modules directory, but general services can be found too.

> 👉 Read more in [Guide > Features > Services](../2.%20Features/x.%20Services.md)

### Types

This directory contains typescript type files only. Ones that are general to the application, and not part of a specific 
domain module, would usually live here.

If you have types that are more specific to your [app's modules](../../../src/modules), you may find yourself
adding a `types` directory under the feature, with feature-specific types in there instead.

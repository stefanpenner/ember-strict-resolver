# 1.3.0 (10/09/2020)

- [dependencies] bumps `ember-cli-htmlbars@4.2.3` -> `ember-cli-htmlbars@5.3.1`

# 1.2.1 (08/24/2020)

- [bug] resolver.moduleBasedResolver must be set for the ember router to enable loading substates, so set that property in the constructor.

# 1.2.0 (05/25/2020)

- [enhancement] bring down upstream, `ember-resolver`, parsing logic, ensures that we don't assert against types that are not required to be dasherized and also put that behind a debug flag
- [bug] ensure that require key exists before trying to retrieve from the require registry

# 1.1.1 (05/21/2020)

- Ensure internal `layoutFor` lookups for namespaced templates works

# 1.1.0 (04/07/2020)

- Fix uses of resolveRegistration('config:environment'). This works in the ember-resolver/classic as there is a hard coded rule that says to not pluralize config. This adds a similar rule but in the form of a strict requirement rather than a part of a pluralize strategy like ember-resolver/classic.

# 1.0.0 (03/30/2020)

- bumps all dependencies to support ember>=3.12

# 0.2.1 (03/27/2020)

- Removes monkey patch for registry caching and make it an opt via readme instructions

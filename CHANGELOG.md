# 1.1.1 (05/21/2020)

- Ensure internal `layoutFor` lookups for namespaced templates works

# 1.1.0 (04/07/2020)

- Fix uses of resolveRegistration('config:environment'). This works in the ember-resolver/classic as there is a hard coded rule that says to not pluralize config. This adds a similar rule but in the form of a strict requirement rather than a part of a pluralize strategy like ember-resolver/classic.

# 1.0.0 (03/30/2020)

- bumps all dependencies to support ember>=3.12

# 0.2.1 (03/27/2020)

- Removes monkey patch for registry caching and make it an opt via readme instructions

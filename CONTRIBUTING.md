## Wanted Changes

1. Fixes to incorrect statements or inaccuracies within the documentation.
1. Rewording or extending documentation to clarify unclear wording or complicated explanations.
1. Additions that fill gaps or missing pieces in the current documentation.
1. Fixing of spelling and grammatical errors in the documentation.

## Unwanted Changes

1. Whitespace or formatting changes.
1. Subjective wording changes.
1. Modifications to the overall structure and format of the API docs.
1. Additions that replicate or needlessly restructure current documentation.
1. Additions that document unreleased product functionality.
1. Changes that modify [Community Resources](https://discord.com/developers/docs/topics/community-resources#community-resources) (see [guidelines](https://github.com/discord/discord-api-docs/discussions/4456) for more detail).

## Verifying Changes

To ensure the integrity of your contributions, follow these steps:

1. Execute `npm install --save-dev` to install the required dependencies.
1. Run `npm run build` to compile the documentation.
1. Utilize `npm run lint` to perform a documentation linting check.
1. Correct linting errors, if any, by using `npm run lint:fix`.
1. Validate links by running `npm run test:links`.
1. Confirm proper table formatting by executing `npm run test:tables`.
1. If necessary, rectify table formatting using `npm run fix:tables`. 

See the [README](https://github.com/discord/discord-api-docs/blob/main/README.md) for licensing and legal information.

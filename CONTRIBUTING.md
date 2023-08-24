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

1. Run `npm install --save-dev` to install the dependencies.
1. Run `npm run build` to build the docs.
1. Run `rpm run lint` to lint the docs.
1. Run `npm run lint:fix` to fix linting errors, if needed.
1. Run `npm run test:links` to verify links.
1. Run `npm run test:tables` to verify table formatting.
1. Run `npm run fix:tables` to fix table formatting, if needed.

See the [README](https://github.com/discord/discord-api-docs/blob/main/README.md) for licensing and legal information.

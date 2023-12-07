## eventjet-seatmaps-monorepo

### Release package

We have scripts defined in the respective package folders to easily release a new version of the package. These scripts will automatically remove build folders, run the build command, and bump the version.

Use `yarn release:patch`, `yarn release:minor`, or `yarn release:major` to release a new version. After that, push the changes to the repository.

To publish a package to npm, you must be logged in to your npm account.
You can check if you are logged in by running `npm whoami` in the terminal. If you are not logged in, run `npm login` in the terminal and follow the instructions.

Before publishing, make sure you are in the correct directory. You can check the tarball content with `npm publish --dry-run`.
If everything looks good, you can publish the package using `yarn deploy`.

#### Good to Know

Under the hood, we use `npm publish` to publish the package instead of `yarn publish`. With `npm publish`, we can utilize the already bumped version number in `package.json`. In contrast, with `yarn publish`, you have to specify the package version during the publishing process.

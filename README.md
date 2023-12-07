## eventjet-seatmaps-monorepo

### Release package

We have scripts defined in the respective package folders to easily release a new version of the package. These scripts will automatically remove build folders, run the build command, and bump the version.

Use `yarn release:patch`, `yarn release:minor`, or `yarn release:major` to release a new version. After that, you can push the changes to the repository and publish the package using `yarn deploy`.

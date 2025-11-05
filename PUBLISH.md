# 📦 Publishing Guide for @craftysoft/hooks

## Prerequisites

1. **npm Account**: Make sure you have an npm account
   - Sign up at [npmjs.com](https://www.npmjs.com/signup) if you don't have one

2. **Login to npm**: 
   ```bash
   npm login
   ```
   Enter your npm username, password, and email when prompted.

3. **Verify Login**:
   ```bash
   npm whoami
   ```

## Pre-Publish Checklist

✅ **Build the package**:
```bash
npm run build
```

✅ **Run tests**:
```bash
npm test
```

✅ **Type check**:
```bash
npm run typecheck
```

## Publishing Steps

### 1. Ensure you're logged in to npm
```bash
npm login
```

### 2. Build the package
```bash
npm run build
```

This creates the `dist/` folder with:
- `index.js` (CommonJS)
- `index.mjs` (ESM)
- `index.d.ts` (TypeScript types)
- `index.d.mts` (TypeScript types for ESM)

### 3. Verify what will be published
```bash
npm pack --dry-run
```

This shows you exactly what files will be included in the package.

### 4. Publish the package

For **scoped packages** like `@craftysoft/hooks`, you need to publish with public access:

```bash
npm publish --access public
```

Or you can publish without the flag since `publishConfig.access` is already set to `public` in `package.json`:

```bash
npm publish
```

### 5. Verify Publication

Check your package on npm:
- Visit: https://www.npmjs.com/package/@craftysoft/hooks

## Updating Versions

When you make changes and want to publish a new version:

### Option 1: Manual Version Bump
1. Edit `package.json` and change the `version` field
2. Commit the change: `git commit -am "Bump version to 1.0.2"`
3. Tag the release: `git tag v1.0.2`
4. Push: `git push && git push --tags`
5. Publish: `npm publish`

### Option 2: Using npm version (Recommended)
```bash
# Patch version (1.0.1 -> 1.0.2)
npm version patch

# Minor version (1.0.1 -> 1.1.0)
npm version minor

# Major version (1.0.1 -> 2.0.0)
npm version major
```

This automatically:
- Updates `package.json` version
- Creates a git commit
- Creates a git tag

Then publish:
```bash
npm publish
```

## Troubleshooting

### "You do not have permission to publish"
- Make sure you're logged in: `npm login`
- Check if the package name is already taken (especially for unscoped packages)
- For scoped packages, ensure `publishConfig.access: "public"` is in `package.json`

### "Package name already exists"
- If you own it, you can update it by bumping the version
- If you don't own it, you need to choose a different name

### Build errors
- Make sure all dependencies are installed: `npm install`
- Check TypeScript errors: `npm run typecheck`
- Review the build output: `npm run build`

## After Publishing

1. **Update README** if needed with new version badges
2. **Create a GitHub release** (optional but recommended)
3. **Share the package** on social media or dev communities!

## Package Details

- **Package Name**: `@craftysoft/hooks`
- **Current Version**: 1.0.1
- **Registry**: https://registry.npmjs.org/
- **Package URL**: https://www.npmjs.com/package/@craftysoft/hooks

---

Happy Publishing! 🚀


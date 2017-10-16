# d3-typescript
Experiment with D3 V4 and Typescript


# Setup

## Bower

Bower is a package manager for frontend packages
```
bower init
```

Add the D3 library and update `bower.json`
```
bower install d3 --save
```

## Typescript

Add typescript to npm
```
npm init
npm install --save-dev typescript
```

The typings are only needed by the compiler so we only need them in the node nodules
```
npm install @types/d3 --save-dev
```

# Create a `tsconfig.json` file that looks like this:
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "noImplicitAny": false,
    "sourceMap": true,
    "outDir": "dist/"
  },
  "exclude": [
    "node_modules"
  ]
}
```

Configure IntelliJ to compile Typescript. Do not use the TypeService as it will cause issues with the types detected


## Folder structure

Create:
```
dist/
src/
```

Add both `.html` and `.ts` to a `src` folder. Intellij will automatically compile to .ts


# Links

- D3 and Typescript: https://hstefanski.wordpress.com/2015/06/07/creating-a-chart-with-d3-and-typescript-part-1/
- About selections: https://github.com/d3/d3-selection/issues/86
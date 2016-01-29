Find Git commit authors who are not listed in `AUTHORS`

```shellsession
$ npm install --save-dev check-authors-certificate
```

Then update your `test` npm script in `package.json`:

```json
{
  "scripts": {
    "test": "run your tests && npm run check-authors",
    "check-authors": "check-authors-certificate"
  }
}
```

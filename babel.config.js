module.exports = {
  presets: [
    ['@vue/app', {
      useBuiltIns: 'entry',
      polyfills: [
        'es6.symbol',
        'es6.promise'
      ]
    }]
  ],
  // plugins: [["import", {
  //   libraryName: "iview",
  //   libraryDirectory: "src/components"
  // }]]
}

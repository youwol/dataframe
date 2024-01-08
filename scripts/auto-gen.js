fs = require('fs')

let package_json = JSON.parse(fs.readFileSync('./package.json', 'utf8'))

let namespace = package_json['name'].includes('/')
    ? package_json['name'].split('/')[0].replace('@', '')
    : ''

let content = `export let AUTO_GENERATED = {
    name: "${package_json['name']}",
    namespace: "${namespace}",
    version: "${package_json['version']}",
    description: "${package_json['description']}"
}`

fs.writeFile('./src/auto_generated.ts', content, function (err) {
    if (err) {
        return console.log(
            'There was a problem while creating the auto-generated file; see scripts/auto-gen.js',
            err,
        )
    }
    console.log('Auto generated file saved.')
})

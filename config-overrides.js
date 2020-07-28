const { paths } = require('react-app-rewired')
const rewireAliases = require('react-app-rewire-aliases')
const path = require('path')

module.exports = function override(config, env) {
  config = rewireAliases.aliasesOptions({
    '@components': path.resolve(__dirname, `${paths.appSrc}/components/`),
    '@views': path.resolve(__dirname, `${paths.appSrc}/views/`),
    react: path.resolve(__dirname, `./node_modules/react`),
    'styled-components': path.resolve(__dirname, `./node_modules/styled-components`),
    'styled-system': path.resolve(__dirname, `./node_modules/styled-system`),
    '@styled-system/css': path.resolve(__dirname, `./node_modules/@styled-system/css`),
    deepmerge: path.resolve(__dirname, `./node_modules/deepmerge`),
  })(config, env)
  return config
}

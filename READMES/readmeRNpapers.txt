Getting started (https://callstack.github.io/react-native-paper/docs/guides/getting-started/)

1 npm install react-native-paper
1.1 npm install react-native-safe-area-context

!!! --- babel.config.j --- !!!

If you created your project using Expo, it'll look something like this:

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};
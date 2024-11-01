const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const path = require('path');

const dotenv = require('dotenv').config({ path: `${__dirname}/.env` });
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const deps = require("./package.json").dependencies;

const getStyleLoaders = ({ cssOptions, preProcessor }) => {
  const loaders = [
    // require.resolve("style-loader"), // for dev, mini css for prod
    {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: 'css-loader',
      options: cssOptions,
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            postcssPresetEnv({
              stage: 3,
              features: {
                'nesting-rules': true,
              },
            }),
          ],
        },
      },
    },
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push({
      loader: require.resolve(preProcessor),
      options: {
        sourceMap: true,
      },
    });
  }
  return loaders;
};

module.exports = {
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: "defaults" }],
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
      },
      {
        test: /\.(ts)x?$/,
        exclude: /node_modules|\.d\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              noEmit: false,
            },
          },
        },
      },
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: getStyleLoaders({
          cssOptions: {
            importLoaders: 1,
            sourceMap: true,
          },
        }),
        sideEffects: true,
      },
      {
        test: cssModuleRegex,
        use: getStyleLoaders({
          cssOptions: {
            importLoaders: 1,
            sourceMap: true,
            modules: true,
          },
        }),
      },
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: getStyleLoaders({
          cssOptions: {
            importLoaders: 2,
            sourceMap: true,
            modules: true,
          },
          preProcessor: 'sass-loader',
        }),
        sideEffects: true,
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
  },
  devServer: {
    port: 3000,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    // new webpack.ProvidePlugin({
    //   React: 'react',
    // }),
    new ModuleFederationPlugin({
      name: "widgets",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./App": "./src/App.tsx",
        "./Store": "./src/lib/store/store.ts",
        "./Button": "./src/Button",
        "./Amount": "./src/Amount",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
          // eager: true,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps.react,
          // eager: true,
        },
      },
    }),
  ],
};

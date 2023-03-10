const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: {
		app: "./src/index.ts",
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: "/node_modules/",
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	output: {
		filename: "index.js",
		path: path.resolve(__dirname, "dist"),
	},
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
		static: "./src/",
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.ejs",
		}),
	],
};

const plugins = [
	[
		"babel-plugin-import",
		{
			libraryName: "@material-ui/core",
			libraryDirectory: "",
			camel2DashComponentName: false,
		},
		"core",
	],
	[
		"babel-plugin-import",
		{
			libraryName: "@material-ui/icons",
			libraryDirectory: "",
			camel2DashComponentName: false,
		},
		"icons",
	],
];
const presets = [
	{
		presets: ["next/babel"],
		plugins: [
			[
				"styled-components",
				{ ssr: true, displayName: true, preprocess: false },
			],
		],
	},
];

module.exports = { plugins, presets };

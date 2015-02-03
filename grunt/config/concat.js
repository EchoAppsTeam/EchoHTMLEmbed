module.exports = {
	dashboard: {
		src: [
			'<%= dirs.build %>/*/dashboard.js',
			'<%= dirs.build %>/*/dashboard/*.js'
		],
		nonull: true,
		dest: '<%= dirs.build %>/dashboards.js'
	},
	app: {
		src: [
			'<%= dirs.build %>/*/app.js',
			'<%= dirs.build %>/text/utils.js'
		],
		nonull: true,
		dest: '<%= dirs.build %>/apps.js'
	}
};

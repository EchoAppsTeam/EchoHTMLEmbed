module.exports = {
	dashboard: {
		src: [
			'<%= dirs.src %>/*/dashboard.js'
		],
		dest: '<%= dirs.build %>/dashboards.js'
	},
	app: {
		src: [
			'<%= dirs.src %>/*/app.js'
		],
		dest: '<%= dirs.build %>/apps.js'
	}
};

module.exports = {
	manifest: {
		expand: true,
		cwd: '<%= dirs.src %>',
		src: '*/app-manifest.json',
		dest: '<%= dirs.build %>/'
	},
	js: {
		expand: true,
		cwd: '<%= dirs.src %>',
		src: ['<%= sources.js %>', '!*/app.js', '!*/dashboard.js'],
		dest: '<%= dirs.build %>/'
	}
};

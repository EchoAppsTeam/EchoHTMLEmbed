module.exports = {
	options: {
		tasks: {
			dev: [
				'copy:third-party',
				'wrap',
				'copy:js',
				'concat',
				'clean:own'
			],
			min: [
				'copy:third-party',
				'wrap',
				'copy:js',
				'uglify',
				'concat',
				'clean:own'
			]
		}
	}
};

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      unit: {
        singleRun: true
      },
      continuous: {
        background: true
      }
    },

    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    },

    watch: {
      karma: {
        // server must be running
        files: ['public/**', 'server/**', 'specs/**'],
        tasks: ['karma:continuous:run']
      }
    },

  });
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('test', ['karma:continuous:start', 'watch:karma']);
  grunt.registerTask('server', function(target){
    var nodemon = grunt.util.spawn({
      cmd: 'grunt',
      grunt: true,
      args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run(['watch']);

  });
};

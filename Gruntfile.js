module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    uglify: {
      dist: {
        src: "dist/*.js",
        dest: "dist/",
        expand: true,
        flatten: true,
        ext: ".bundle.js"
      }
    },

    cssmin: {
      css: {
        src: "dist/*.css",
        dest: "dist",
        expand: true,
        flatten: true,
        ext: ".bundle.css"
      }
    },

    clean: {
      build: {
        src: [ "public/assets/" ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask("default", ["uglify", "cssmin"]);
}


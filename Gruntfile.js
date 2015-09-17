module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-broccoli");


  grunt.initConfig({
    broccoli: {
      wwwdev: {
        dest: "wwwdev",
        config: "Brocfile.js",
        env: "development"
      },
      www: {
        dest: "www",
        config: "Brocfile.js",
        env: "production"
      }
    },
  });
};

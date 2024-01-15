const {src,dest,watch,series,parallel} = require('gulp');

//CSS Y SASS
const sass= require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');


//IMAGENES
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');


function css(done){
//conmpilar sass 
//pasos: 1 identificar archivo-2compilarla 3-guardar el .css
src('src/scss/app.scss')
.pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/css'))

    done();
}


function imagenes(done){
src('src/img/**/*')
.pipe(imagemin({optimizationLevel: 3}))
.pipe(dest('build/img'));

done();
}


function versionWebp(done){

src('src/img/**/*.{png,jpg}')
.pipe(webp())
.pipe(dest('build/img'))

    done();
}


function dev(){
//este watch es para buscar todos los archivos scss 
watch('src/scss/**/*.scss',css);
watch('src/img/**/*',imagenes);
//watch('src/scss/app.scss',css);
}


// function tareaDefault(){
//     console.log('soy la tarea por default');
// }

exports.css = css;
exports.dev = dev;
// exports.default = tareaDefault;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.default = series(imagenes,versionWebp,css,dev);



//SERIES - se inicia una tarea, y hasta que finaliza, inicia la siguiente

//PARALLEL - Todas inician al mismo tiempo 
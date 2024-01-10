const {src,dest,watch,series,parallel} = require('gulp');
const sass= require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

function css(done){
//conmpilar sass 
//pasos: 1 identificar archivo-2compilarla 3-guardar el .css

src('src/scss/app.scss')
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(dest('build/css'))

    done();
}


function dev(){
//este watch es para buscar todos los archivos scss 
watch('src/scss/**/*.scss',css);

//watch('src/scss/app.scss',css);
}


// function tareaDefault(){
//     console.log('soy la tarea por default');
// }

exports.css = css;
exports.dev = dev;
// exports.default = tareaDefault;
exports.default = series(css,dev);


//SERIES - se inicia una tarea, y hasta que finaliza, inicia la siguiente

//PARALLEL - Todas inician al mismo tiempo 
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import { terser } from 'rollup-plugin-terser';
import cleaner from 'rollup-plugin-cleaner';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const input = 'src/index.ts';

const typescriptPluginArgs = {
  typescript: require('typescript'),
};

export default [
  {
    input,
    output: [
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
        sourcemap: process.env.BUILD === 'development',
        plugins: [terser()],
      },
    ],
    plugins: [
      typescript({
        ...typescriptPluginArgs,
        tsconfig: './tsconfig.esm.json',
      }),
    ],
  },
  {
    input,
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({
        ...typescriptPluginArgs,
        tsconfig: './tsconfig.cjs.json',
      }),
    ],
     plugins: [
    serve({
        // Launch in browser
        open: true,

        // Show server address in console
        verbose: true,

        // Folder to serve files from
        // contentBase: '',

        // Multiple folders to serve from
        contentBase: ['', 'dist'],

        // Set to true to return index.html (200) instead of error page (404)
        historyApiFallback: true,

        // Path fallback page
        // historyApiFallback: '/200.html',

        // Setting up server options
        host: 'localhost',
        port: 3000,

         // By default server will be served over HTTP (https: false). It can optionally be served over HTTPS
        // https: {
        //     key: fs.readFileSync('/path/to/server.key'),
        //     cert: fs.readFileSync('/path/to/server.crt'),
        //     ca: fs.readFileSync('/path/to/ca.pem')
        // },

         //set headers
        // headers: {
        //     'Access-Control-Allow-Origin': '*',
        //     foo: 'bar'
        // },

          // set custom mime types, usage https://github.com/broofa/mime#mimedefinetypemap-force--false
        // mimeTypes: {
        //     'application/javascript': ['js_commonjs-proxy']
        // }

          // execute function after server has begun listening
        // onListening: function (server) {
        //     const address = server.address()
        //     const host = address.address === '::' ? 'localhost' : address.address
        //     // by using a bound function, we can access options as `this`
        //     const protocol = this.https ? 'https' : 'http'
        //     console.log(`Server listening at ${protocol}://${host}:${address.port}/`)
        // }
      }),
    livereload({ watch: ['', 'dist'] }),
   ]
  },
];


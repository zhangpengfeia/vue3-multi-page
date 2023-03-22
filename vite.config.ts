import { resolve } from 'path'
import { loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import WindiCSS from 'vite-plugin-windicss'
import progress from 'vite-plugin-progress'
import EslintPlugin from 'vite-plugin-eslint'
import { ViteEjsPlugin } from 'vite-plugin-ejs'
import PurgeIcons from 'vite-plugin-purge-icons'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'
import fs from 'fs-extra'

// https://vitejs.dev/config/
function pathResolve(dir: string) {
  return resolve(root, '.', dir)
}

/**
 * 删除指定目录下所有子文件
 * @param {*} path
 */
function emptyDirectory(directory) {
  fs.emptyDir(directory, (err) => {
    if (err) {
      console.error(`Error while emptying the directory ${directory}: ${err}`);
    } else {
      console.log(`Directory ${directory} is emptied`);
    }
  });
}

const root = process.cwd()
const project = require('./scripts/multiPages.json')
const npm_config_project = process.env.npm_config_pro
let filterProjects = []
if (npm_config_project) {
  filterProjects = project.filter((ele) => {
    return ele.chunk.toLowerCase() === npm_config_project.toLowerCase()
  })
  console.log(`--------单独构建：${filterProjects[0]['chunk']}：${filterProjects[0]['chunkName']}--------`)
} else {
  console.log('--------暂时不支持全部构建，请单独构建--------')
  throw new Error('暂时不支持全部构建，请单独构建')
}

const multiPages = (p) => {
  const pages = {}
  p.forEach((ele) => {
    const htmlUrl = pathResolve(`src/pages/${ele.chunk}/index.html`)
    pages[ele.chunk] = htmlUrl
  })
  return pages
}
const multiBuild = (p) => {
  const buildOutputConfigs: any = []
  p.forEach((ele) => {
    // 配置多出口打包
    // const pageExists = fs.existsSync(pathResolve(`dist/${ele.chunk}`))
    // if (pageExists) {
    //   emptyDirectory(pathResolve(`dist/${ele.chunk}`))
    //   return
    // }
    buildOutputConfigs.push({
      dir: `dist/`,
      // dir: `dist/${ele.chunk}/`,
      assetFileNames: '[ext]/[name]-[hash].[ext]',
      chunkFileNames: 'js/[name]-[hash].js',
      entryFileNames: 'js/[name]-[hash].js'
    })
  })
  return buildOutputConfigs
}

// const rootUrl = filterProjects.length > 1 ? './src' : `./src/pages/${filterProjects[0]['chunk']}`


export default ({ command, mode }: ConfigEnv): UserConfig => {
  let env = {} as any
  const isBuild = command === 'build'
  if (!isBuild) {
    env = loadEnv(process.argv[3] === '--mode' ? process.argv[4] : process.argv[3], root)
  } else {
    env = loadEnv(mode, root)
  }
  return {
    root: `./src/pages/${filterProjects[0]['chunk']}`,
    base: './',
    envDir: '../../../',
    build: {
      // outDir: `./dist/${filterProjects[0]['chunk']}`,
      emptyOutDir: true,
      rollupOptions: {
        //配置多页应用程序入口文件
        input: multiPages(filterProjects),
        //打包到目标目录
        output: multiBuild(filterProjects)
      }
    },
    plugins: [
      Vue(),
      VueJsx(),
      WindiCSS({
        scan: {
          dirs: ['../../'], // 识别以index.html为开始的上一级上一级目录
          fileExtensions: ['vue', 'js', 'ts', 'tsx'] // 同时启用扫描vue/js/ts
        }
      }),
      progress(),
      createStyleImportPlugin({
        resolves: [ElementPlusResolve()],
        libs: [
          {
            libraryName: 'element-plus',
            esModule: true,
            resolveStyle: (name) => {
              return `element-plus/es/components/${name.substring(3)}/style/css`
            }
          }
        ]
      }),
      EslintPlugin({
        cache: false,
        include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx'] // 检查的文件
      }),
      createSvgIconsPlugin({
        iconDirs: [pathResolve('src/assets/svgs')],
        symbolId: 'icon-[dir]-[name]',
        svgoOptions: true
      }),
      PurgeIcons(),
      DefineOptions(),
      ViteEjsPlugin({
        title: env.VITE_APP_TITLE
      }),
      {
        name: 'delete-dist',
        async buildStart() {
          // remove the dist folder before each build
          // await fs.promises.rmdir('./dist', { recursive: true });
          const pageExists = fs.existsSync(pathResolve(`dist`))
          if (pageExists && isBuild) {
            emptyDirectory(pathResolve('./dist'))
            console.log('清空dist');
          }
        }
      }
    ],

    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "./src/styles/variables.module.less";',
          javascriptEnabled: true
        }
      }
    },
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.less', '.css'],
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js'
        },
        {
          find: /\@\//,
          replacement: `${pathResolve('src')}/`
        }
      ]
    },

    server: {
      port: 5000,
      proxy: {
        // 选项写法
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
      hmr: {
        overlay: false
      },
      host: '0.0.0.0'
    },
    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        'vue-types',
        'element-plus/es/locale/lang/zh-cn',
        'element-plus/es/locale/lang/en',
        '@iconify/iconify',
        '@vueuse/core',
        'axios',
        'qs',
        'echarts',
        'echarts-wordcloud',
        'intro.js',
        'qrcode',
        '@wangeditor/editor',
        '@wangeditor/editor-for-vue'
      ]
    }
  }
}

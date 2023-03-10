/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhangpf1
 * @Date: 2023-02-13 15:09:58
 * @LastEditTime: 2023-02-25 21:21:58
 */
import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";
import PurgeIcons from 'vite-plugin-purge-icons'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path'

const root = process.cwd()

function pathResolve(dir: string) {
  return resolve(root, '.', dir)
}


const project = require('./scripts/multiPages.json')
const npm_config_project = process.env.npm_config_pro
let filterProjects = []
console.log(npm_config_project)
if (npm_config_project) {
  filterProjects = project.filter((ele) => {
    return ele.chunk.toLowerCase() === npm_config_project.toLowerCase()
  })
  console.log(`--------单独构建：${filterProjects[0]['chunkName']}--------`)
} else {
  filterProjects = project
}

const multiPages = (p) => {
  const pages = {}
  p.forEach((ele) => {
    console.log(ele)
    const htmlUrl = pathResolve(`src/pages/${ele.chunk}/index.html`)
    pages[ele.chunk] = htmlUrl
  })
  return pages
}
const multiBuild = (p) => {
  const buildOutputConfigs:any = []
  p.forEach((ele) => {
    // 配置多出口打包
    buildOutputConfigs.push({
      dir: `dist/${ele.chunk}/`,
      assetFileNames: '[ext]/[name]-[hash].[ext]',
      chunkFileNames: 'js/[name]-[hash].js',
      entryFileNames: 'js/[name]-[hash].js'
    })
  })
  return buildOutputConfigs
}


// https://vitejs.dev/config/
export default defineConfig({
  root: `./src/pages/${filterProjects[0]['chunk']}`,
  base: './',
  envDir: '../',
  build: {
    rollupOptions: {
      //配置多页应用程序入口文件
      input: multiPages(filterProjects),
      //打包到目标目录
      output: multiBuild(filterProjects)
    }
  },
  plugins: [
    vue(),
    WindiCSS(),
    vueJsx(),
    PurgeIcons(),
    createSvgIconsPlugin({
      iconDirs: [pathResolve('src/assets/svgs')],
      symbolId: 'icon-[dir]-[name]',
      svgoOptions: true
    }),
  ],
  server: {
    port: 5000,
    proxy: {
      // 选项写法
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    },
    hmr: {
      overlay: false
    },
    host: '0.0.0.0'
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.less', '.css'],
    alias: [
      {
        find: /\@\//,
        replacement: `${pathResolve('src')}/`
      }
    ]
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: '@import "./src/styles/variables.module.less";',
        javascriptEnabled: true
      }
    }
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'vue-types',
      '@iconify/iconify',
      '@vueuse/core',
      'axios',
      'qs',
      'echarts',
      'echarts-wordcloud',
    ]
  }

})

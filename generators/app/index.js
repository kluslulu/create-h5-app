// 此文件作为Generator的核心入口
// 需要导出一个继承自Yeoman Generator的类型
// Yeoman Generator在工作时会自动调用在此类型中定义的一些生命周期方法
// 我们在这些方法中可以通过调用父类提供的一些工具方法实现一些功能，例如文件写入


const Generator = require('yeoman-generator')
module.exports = class extends Generator {
  prompting() {
    // Yoman 在询问用户环节会自动调用此方法
    // 在此方法中可以调用父类的prompt()方法发出对用户的命令行询问
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your Project name',
        default: this.appname // appname 为项目生辰目录名称
      }
    ]).then(answers => {
      // answers => {name: 'user input value'}
      this.answers = answers
    })
  }
  writing() {
    // Yeoman自动在生成文件阶段调用此方法
    // this.fs.write(
    //   this.destinationPath('tmp.txt'),
    //   Math.random().toString()
    // )
    // 通过模板方式写入文件到目标目录
    // 模板文件路径
    // const tpl = this.templatePath('bar.html')
    // // 输出目标路径
    // const output = this.destinationPath('bar.html')
    // // 模板数据上下文
    // const context = this.answers

    // this.fs.copyTpl(tpl, output, context)
    // 把每一个文件都通过模板转换到目标路径
    const templates = [
      '.browserslistrc',
      '.editorconfig',
      '.eslintrc.js',
      '.gitignore',
      'babel.config.js',
      'package.json',
      'postcss.config.js',
      'README.md',
      'tsconfig.json',
      'vue.config.js',
      'public/favicon.ico',
      'public/index.html',
      'src/api/index.ts',
      'src/assets/logo.png',
      'src/components/Header/index.vue',
      'src/components/index.ts',
      'src/router/index.ts',
      'src/store/index.ts',
      'src/utils/index.ts',
      'src/utils/request.ts',
      'src/views/About.vue',
      'src/App.vue',
      'src/main.ts',
      'src/shims-tsx.d.ts',
      'src/shims-vue.d.ts'
    ]
    templates.forEach(item => {
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(item),
        this.answers
      )
    })
  }
}

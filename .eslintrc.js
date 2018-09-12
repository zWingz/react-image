module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['eslint-config-airbnb-base', 'plugin:react/recommended'],
  globals: {
    $: true,
    define: true,
    require: true
  },
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
    amd: true
  },
  plugins: [],
  rules: {
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true
      }
    ],
    // 是否允许未命名fuc
    'func-names': 'off',
    // 禁止对函数参数再赋值
    'no-param-reassign': 'off',
    // 是否在import比较带上后缀, webpack中可以关闭,因为有alias
    'import/extensions': 'off',
    // 禁止路径无法被文件系统解析的import, webpack中可以关闭,因为有alias
    'import/no-unresolved': 'off',
    // 是否允许有下划线
    'no-underscore-dangle': 'off',
    // 括号内是否有空格
    'space-in-parens': ['error', 'never'],
    // 是否允许引入不在dependencies的包
    'import/no-extraneous-dependencies': 'off',
    // 字面量是否强制使用简写
    'object-shorthand': 'off',
    // 建议使用模板而非字符串连接 (prefer-template)
    'prefer-template': 'off',
    // 是否允许只export一个变量而不使用export default
    'import/prefer-default-export': 'off',
    // 分号
    semi: ['error', 'never'],
    // funciont 括号前不带任何空格,即 function(){} 和 function fnc(){}
    'space-before-function-paren': 'off',
    // 关键词前面不带任何空格
    'keyword-spacing': [
      'error',
      {
        overrides: {
          if: { after: false },
          for: { after: false },
          while: { after: false },
          from: { after: true }
        }
      }
    ],
    'comma-dangle': ['error', 'never'],
    // 必须使用驼峰命名
    camelcase: 'off',
    // "object-curly-spacing": ["error", "always", { "arraysInObjects": false }],
    'object-curly-spacing': 'off',
    // 数组中是否存在空格
    'array-bracket-spacing': [
      'off',
      'never',
      {
        arraysInArrays: false,
        objectsInArrays: false,
        singleValue: false
      }
    ],
    // 是否允许++ 和 --
    'no-plusplus': 'off',
    // import需要放在最前面
    'import/first': 'off',
    // 单行最大长度
    'max-len': 'off',
    // require是否必须放在头部
    'global-require': 'off',
    // 禁止使用嵌套的三元表达式
    'no-nested-ternary': 'off',
    // import后面是否需要跟空行
    'import/newline-after-import': 'off',
    // 声明变量是否在同一行
    'one-var': 'off',
    // 禁止混合使用不同的操作符 即 a + b * c
    'no-mixed-operators': 'off',
    // 禁止未使用过的表达式 即 a && b() 这类
    'no-unused-expressions': 'off',
    // 禁止 if 语句作为唯一语句出现在 else 语句块中
    'no-lonely-if': 'off',
    // 关闭箭头函数必须包含括号
    'arrow-parens': 'off',
    // 闭包函数格式 (fnc(){})()
    'wrap-iife': ['error', 'inside'],
    'no-useless-escape': 'off',
    'class-methods-use-this': 'off',
    'react/prop-types': 0,
    'react/display-name': 'off',
    'no-console': ["error", { allow: ["warn", "error"] }],
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true
        }
      },
      {
        enforceForRenamedProperties: false
      }
    ]
  }
}

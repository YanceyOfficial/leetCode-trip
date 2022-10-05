'use strict'
var e = require('chalk'),
  t = require('clear'),
  n = require('figlet'),
  r = require('inquirer'),
  a = require('fs'),
  i = require('param-case'),
  o = require('ora'),
  s = require('yancey-js-util')
function c(e) {
  return e && 'object' == typeof e && 'default' in e ? e : { default: e }
}
var u,
  l = c(e),
  d = c(t),
  f = c(n),
  m = c(r),
  y = c(o)
!(function (e) {
  ;(e.Easy = 'Easy'),
    (e.Medium = 'Medium'),
    (e.Hard = 'Hard'),
    (e.Others = 'Others')
})(u || (u = {}))
const p = `${process.cwd()}/src/leetcode`,
  $ = `${process.cwd()}/leetcode-docs`,
  h = [
    { name: u.Easy },
    { name: u.Medium },
    { name: u.Hard },
    { name: u.Others },
  ],
  w = (e, t, n) => {
    const r = `${p}/${e}/${t}`,
      o = a.readFileSync(r, { encoding: 'utf-8' }),
      [s, c] = t.split('.'),
      { functionName: u, functionBody: l } = ((e) => {
        const t = e.match(/\/\/ @lc code=start([\s\S]*)?\/\/ @lc code=end/im)
        if (Array.isArray(t)) {
          const e = t[1],
            n = e.match(/var([\s\S]*?)=/i)
          if (Array.isArray(n)) {
            const t = n[1].trim()
            return { functionBody: e, functionName: i.paramCase(t) }
          }
          throw new Error('Can not get the function name string.')
        }
        throw new Error('Can not get the function body string.')
      })(o),
      d = `${$}/${e.toLowerCase()}/${s}-${u}.mdx`
    return a.existsSync(d)
      ? '文件已存在, 请重新选择.'
      : !!n || {
          outPath: d,
          meta: { serial: s, title: c, functionName: u, functionBody: l },
        }
  }
m.default.registerPrompt(
  'autocomplete',
  require('inquirer-autocomplete-prompt'),
)
;(async () => {
  d.default(),
    console.log(
      l.default.blue(
        f.default.textSync('LEETCODE TRIP', {
          horizontalLayout: 'default',
          verticalLayout: 'default',
        }),
      ),
    )
  const { dir: e } = await m.default.prompt([
      { type: 'list', message: '请选择难度: ', name: 'dir', choices: h },
    ]),
    t = ((e) => {
      const t = `${p}/${e}`
      return a
        .readdirSync(t)
        .sort((e, t) => +e.split('.')[0] - +t.split('.')[0])
    })(e),
    { file: n } = await ((e, t) =>
      m.default.prompt([
        {
          type: 'autocomplete',
          message: '请选择文件: ',
          name: 'file',
          pageSize: 20,
          source: (e, n) => t.filter((e) => e.includes(n || '')),
          validate: (t) => w(e, t.name || '', !0),
        },
      ]))(e, t)
  await (async (e, t) => {
    const n = w(e, t)
    if ('object' != typeof n) return
    const {
        outPath: r,
        meta: { serial: i, title: o, functionBody: c, functionName: u },
      } = n,
      l = y.default('正在创建中...').start()
    await s.sleep(),
      a.writeFileSync(
        r,
        ((e, t, n, r) =>
          `---\nid: ${e}-${n}\ntitle: ${t}\nsidebar_label: ${e}. ${t}\nkeywords:\n  - HashMap\n---\n\n:::success Tips\n题目类型: HashMap\n\n相关题目:\n\n- [1. 两数之和](/leetcode/easy/1-two-sum)\n\n:::\n\n## 题目\n\n这里是题目这里是题目这里是题目这里是题目这里是题目\n\n:::info 示例\n\n输入:\n\n输出:\n:::\n\n## 题解\n\n这里是题解这里是题解这里是题解这里是题解这里是题解\n\n\`\`\`ts\n${r}\n\`\`\`\n`)(
          i,
          o,
          u,
          c,
        ),
      ),
      l.stop(),
      y.default().succeed('模版创建成功!')
  })(e, n)
})()

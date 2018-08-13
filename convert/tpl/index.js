require('./self-close-tag')
const parse = require('parse5')
const { commentDelete } = require('../utils')
const process = require('./process')

module.exports = function (tpl) {
  tpl = commentDelete(tpl)

  let ast = parse.parseFragment(tpl, {
    treeAdapter: parse.treeAdapters.default,
    locationInfo: true
  })
  const processRes = process(ast)
  return {
    tpl: parse.serialize(processRes.ast),
    attrCollection: processRes.attrCollection
  }
}
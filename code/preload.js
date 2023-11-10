const md5JS = require('./md5.js')
window.exports = {
	bl: {
		mode: 'list', // 列表模式
		args: {
			// 进入插件时调用（可选）
			enter: (action, callbackSetList) => {
				load(action, callbackSetList)
			},
			// 子输入框内容变化时被调用 可选 (未设置则无搜索)
			search: (action, searchWord, callbackSetList) => {
				toEnglish(action, searchWord, callbackSetList)
			},
			// 用户选择列表中某个条目时被调用
			select: (action, itemData, callbackSetList) => {
				copyText(itemData.title)
			},
			// 子输入框为空时的占位符，默认为字符串"搜索"
			placeholder: '请输入中文变量名',
		},
	},
  xt: {
    mode: 'list', // 列表模式
		args: {
			enter: (action, callbackSetList) => {
				load(action, callbackSetList)
			},
			search: (action, searchWord, callbackSetList) => {
				toEnglishType(action.code, searchWord, callbackSetList)
			},
			select: (action, itemData, callbackSetList) => {
				copyText(itemData.title)
			},
			placeholder: '请输入中文变量名',
		},
  },
  dt: {
    mode: 'list', // 列表模式
		args: {
			enter: (action, callbackSetList) => {
				load(action, callbackSetList)
			},
			search: (action, searchWord, callbackSetList) => {
				toEnglishType(action.code, searchWord, callbackSetList)
			},
			select: (action, itemData, callbackSetList) => {
				copyText(itemData.title)
			},
			placeholder: '请输入中文变量名',
		},
  },
  xh: {
    mode: 'list', // 列表模式
		args: {
			enter: (action, callbackSetList) => {
				load(action, callbackSetList)
			},
			search: (action, searchWord, callbackSetList) => {
				toEnglishType(action.code, searchWord, callbackSetList)
			},
			select: (action, itemData, callbackSetList) => {
				copyText(itemData.title)
			},
			placeholder: '请输入中文变量名',
		},
  },
  cl: {
    mode: 'list', // 列表模式
		args: {
			enter: (action, callbackSetList) => {
				load(action, callbackSetList)
			},
			search: (action, searchWord, callbackSetList) => {
				toEnglishType(action.code, searchWord, callbackSetList)
			},
			select: (action, itemData, callbackSetList) => {
				copyText(itemData.title)
			},
			placeholder: '请输入中文变量名',
		},
  },
  hx: {
    mode: 'list', // 列表模式
		args: {
			enter: (action, callbackSetList) => {
				load(action, callbackSetList)
			},
			search: (action, searchWord, callbackSetList) => {
				toEnglishType(action.code, searchWord, callbackSetList)
			},
			select: (action, itemData, callbackSetList) => {
				copyText(itemData.title)
			},
			placeholder: '请输入中文变量名',
		},
  },
  appid: {
    mode: 'list', // 列表模式
		args: {
			enter: (action, callbackSetList) => {
				load(action, callbackSetList)
			},
			search: (action, searchWord, callbackSetList) => {
				setAppid(action, searchWord, callbackSetList)
			},
			select: (action, itemData, callbackSetList) => {
        let appid = `${itemData.description}`
        utools.dbStorage.setItem('appid', appid)
        window.utools.hideMainWindow()
        utools.outPlugin()
			},
			placeholder: '请输入百度APPID,格式:APPID-密钥',
		},
  }
}
// 复制和黏贴操作
function copyText(text) {
  window.utools.hideMainWindow()
  utools.copyText(text)
  if (utools.isWindows()) {
    utools.simulateKeyboardTap('v', 'ctrl')
  }
  if (utools.isMacOs()) {
    utools.simulateKeyboardTap('v', 'command')
  }
  if (utools.isLinux()) {
    utools.simulateKeyboardTap('v', 'ctrl')
  }
  utools.outPlugin()
}
// 初始化
let load = (action, callbackSetList) => {
	callbackSetList([])
	toEnglish(action, action.payload, callbackSetList)	  
}
// bl
let toEnglish = (action, searchWord, callbackSetList) => {
	let res = apiBaidu({ q: searchWord })
  let index = res.indexOf('error')
  if (index != -1) {
    callbackSetList([{
      title: res,
      description: '请根据error_code到百度翻译对照文档找原因',
      icon: '', // 图标
      url: '',
    }])
  } else {
    callbackSetList([
      {
        title: variableNamFun.xtFilter(res),
        description: `小驼峰-${searchWord}-${res}`,
        icon: '', // 图标
        url: '',
      },
      {
        title: variableNamFun.dtFilter(res),
        description: `大驼峰-${searchWord}-${res}`,
        icon: '', // 图标
        url: '',
      },
      {
        title: variableNamFun.xhFilter(res),
        description: `下划线-${searchWord}-${res}`,
        icon: '', // 图标
        url: '',
      },
      {
        title: variableNamFun.hxFilter(res),
        description: `横线-${searchWord}-${res}`,
        icon: '', // 图标
        url: '',
      },
      {
        title: variableNamFun.clFilter(res),
        description: `常量-${searchWord}-${res}`,
        icon: '', // 图标
        url: '',
      },
    ])
  }
}
// 单项转
let toEnglishType = (code, searchWord, callbackSetList) => {
  let res = apiBaidu({ q: searchWord })
  let index = res.indexOf('error')
  callbackSetList([{
    title: index!=-1?res:code=='xt'?variableNamFun.xtFilter(res):code=='dt'?variableNamFun.dtFilter(res):code=='hx'?variableNamFun.hxFilter(res):code=='xh'?variableNamFun.xhFilter(res):code=='cl'?variableNamFun.clFilter(res):'',
    description: index!=-1?'请根据error_code到百度翻译对照文档找原因':`${code=='xt'?'小驼峰':code=='dt'?'大驼峰':code=='hx'?'横线':code=='xh'?'下划线':code=='cl'?'常量':''}-${searchWord}-${res}`,
    icon: '', // 图标
    url: '',
  }])
}
// 格式化
let variableNamFun = {
	dtFilter(str) {
		var strArr = translationFilter(str)
		// 首单词首小写
		strArr[0] = strArr[0].toLowerCase()
		strArr[0] = strArr[0].charAt(0).toUpperCase() + strArr[0].substring(1)
		// 单词首字母大写
		for (let i = 1; i < strArr.length; i++) {
			strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1)
		}
		return strArr.join('')
	},

	xtFilter(str) {
		var strArr = translationFilter(str)
		// 首单词首小写
		strArr[0] = strArr[0].toLowerCase()
		// 单词首字母大写
		for (let i = 1; i < strArr.length; i++) {
			strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1)
		}
		return strArr.join('')
	},

	clFilter(str) {
		var strArr = translationFilter(str)
		for (let i = 0; i < strArr.length; i++) {
			strArr[i] = strArr[i].toUpperCase()
		}
		return strArr.join('_')
	},
	xhFilter(str) {
		var strArr = translationFilter(str)
		for (let i = 0; i < strArr.length; i++) {
			strArr[i] = strArr[i].toLowerCase()
		}
		return strArr.join('_')
	},
	hxFilter(str) {
		var strArr = translationFilter(str)
		for (let i = 0; i < strArr.length; i++) {
			strArr[i] = strArr[i].toLowerCase()
		}
		return strArr.join('-')
	},
}
function translationFilter(str) {
  str = str.replace(/(')/giu, '')
	str = str.replace(/( and | or | the | at | of | was | a )/giu, ' ')
	str = str.replace(/(\s?ing|\s?ed|\s?ly)$/giu, '')
	str = str.replace(/^(the )/giu, '')
	return str.split(' ')
}
// 设置appid
let setAppid = (action, searchWord, callbackSetList) => {
  let arr = searchWord.split('-')
  callbackSetList([{
    title: '输入完成后回车确认',
    description: `${arr[0]}-${arr.length>1?arr[1]:''}`,
    icon: '', // 图标
    url: '',
  }])
}
// api
let apiBaidu = (data) => {
  if (!utools.dbStorage.getItem('appid')) {
    return 'error-请先设置百度Appid,申请链接看软件介绍(免费的)'
  } else if(data.q) {
    let appid = utools.dbStorage.getItem('appid').split('-')
    let res
    let xhr = new XMLHttpRequest() // 创建XHR对象
    xhr.open(
      // 打开链接
      'post',
      'https://fanyi-api.baidu.com/api/trans/vip/translate', // 后端地址
      false
    )
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded') // 设置请求头
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        res = this.responseText
      }
    }
    const randomNum = Math.floor(Math.random() * 9 + 1) + Math.floor(Math.random() * 10 ** 9).toString().padStart(9, '0') 
    const md5Str = `${appid[0]}${data.q}${randomNum}${appid[1]}`
    xhr.send(`q=${data.q}&from=${'zh'}&to=${'en'}&appid=${appid[0]}&salt=${randomNum}&sign=${md5JS(md5Str)}`)
    if (res.indexOf('error') != -1) {
      return res
    } else {
      return JSON.parse(res).trans_result[0].dst
    }
  }error-请先设置百度Appid,申请链接看软件介绍(免费的)
}

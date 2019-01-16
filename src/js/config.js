require.config({
	paths: {
		'mui': './libs/mui.min',
		'better': './libs/better-scroll',
		'jquery': './libs/jquery-3.3.1',
		'picker':'./libs/mui.picker',
		'poppicker':'./libs/mui.poppicker',
		'dtpicker':'./libs/mui.dtpicker'
	},
	shim: {  // 依赖  picker poppicker dtpicker依赖于deps属性下面的['mui']
		'picker':{  // picker 在mui执行后再执行
			deps: ['mui']
		},
		'poppicker': {  // poppicker 在mui执行后再执行
			deps: ['mui']
		},
		'dtpicker': { // dtpicker 在mui执行后再执行
			deps: ['mui']
		}
	}
});
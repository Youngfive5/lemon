require(['./config'], function(){
	require(['mui','jquery'], function (mui, $){
		mui.init();
		
		addEvent();
		tabEvent();
		finishEvent();
	});
});

// 点击键盘
function addEvent () {
	var money = document.querySelector('.money');
	//money.value = "0.00";
	mui('.keyword').on('tap', 'span', function() {
		var text = this.innerHTML;
		if (text == 'X') {
			console.log(this);
			money.value = money.value.substr(0, money.value.length - 1);
		} else if (money.value.indexOf('.') != -1 && text == '.') { 
			 // 框内值能找到. 就让框内值等于当前框的值
			money.value = money.value;
		} else {
			// 在最后 所有判断出路完后 拼接金额
			money.value = money.value + text;
			console.log(money.value)
		} 
	});
	
// 	dls.forEach(item =>{
// 		item.onclick = function () {
// 			dls.forEach(file =>{
// 				file.classList.remove('dt-active');
// 			});
// 			item.classList.add('dt-active');
// 		};
// 	});
// 	var intro = document.querySelector('.cont-list .dt-active dd').innerHTML;
	

};

// 点击完成
function finishEvent () {
	// 点击完成 
	var okBtn = document.querySelector('#ok');
	var dls = Array.from(document.querySelector('.cont-list').querySelectorAll('dl'))
		
	// 变量给dl添加类
	dls.forEach(item =>{
		item.onclick = function () {
			dls.forEach(file =>{
				file.classList.remove('dt-active');
			});
			item.classList.add('dt-active');
		};
	});
	// 点击完成按钮
	okBtn.addEventListener('click', function () {
		var intro = document.querySelector('.cont-list .dt-active dd').innerHTML; // 账单说明
		var type = document.querySelector('.top-tap-active').innerHTML; // 分类
		var icon = document.querySelector('.cont-list .dt-active dt span').className;
		var timer = new Date().toLocaleString().split(' ')[0].split('/');
		// 单位数前加0
		timer[1] = timer[1].length < 2 ? "0" + timer[1] : timer[1];
		timer[2] = timer[2].length < 2 ? "0" + timer[2] : timer[2];
		timer = timer.join('-');
		// 发起ajax
		mui.ajax('/bill/api/addBill', {
			dataType: 'json',
			type: 'post',
			data: {
				"uid": '5c34b5511fcbb93648e1115b',
				"timer": timer,
				"type": type,
				"money": document.querySelector('.money').value,
				"intro": intro,
				"icon": icon
			},
			success: function(data) {
				alert(data.msg);
				document.querySelector('.money').value = '';
				location.href = '/';
			}
		})
	});

};

// 头部切换
function tabEvent () {
	var tapList = document.querySelector('.top-tab');
	var list = Array.from(tapList.querySelectorAll('li'));

	list.forEach(item =>{
		// 遍历添加点击事件
		item.onclick = function () {
			// 遍历添加类名
			document.querySelector('.money').value = ''; //切换类型清空值
			list.forEach(file=>{
				file.classList.remove('top-tap-active');
			});
			this.classList.add('top-tap-active');
		};
	});
};

// 返回主页
back.onclick = function () {
	location.href = '/';
}
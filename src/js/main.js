require(['./config'], function() {
	require(['mui','jquery','picker','poppicker','dtpicker'], function(mui, $,picker,poppicker,dtpicker){
		mui.init();
		
		loadTime();
		isSure();
		tabCanvas();
		timerSelect();
	})
});

// 删除列表 - 确认删除弹出框
function isSure() {
	$('#OA_task_1').on('tap', '.mui-btn', function(event) {
		var elem = this;
		var li = elem.parentNode.parentNode;
		mui.confirm('确认删除该条记录？', 'Hello MUI', btnArray, function(e) {
			if (e.index == 0) {
				li.parentNode.removeChild(li);
			} else {
				setTimeout(function() {
					$.swipeoutClose(li);
				}, 0);
			}
		});
	});
	var btnArray = ['确认', '取消'];
		// 第二个demo，向左拖拽后显示操作图标，释放后自动触发的业务逻辑
		$('#OA_task_2').on('slideleft', '.mui-table-view-cell', function(event) {
			var elem = this;
			mui.confirm('确认删除该条记录？', 'Hello MUI', btnArray, function(e) {
				if (e.index == 0) {
					elem.parentNode.removeChild(elem);
				} else {
					setTimeout(function() {
						$.swipeoutClose(elem);
					}, 0);
				}
			});
		});
};

// 切换账单/图表
function tabCanvas () {
	var tabBill = document.querySelector('.tab-bill'); //切换到账单
	var tabcanvas = document.querySelector('.tab-canvas');//切换到图表
	var chart = document.querySelector('.mui-scroll-chart');//图表内容区
	var listCont = document.querySelector('.mui-table-view'); //列表内容区
	tabBill.addEventListener('tap', function() {
		this.classList.add('tap-active');
		tabcanvas.classList.remove('tap-active');
		chart.style.display = "none";
		listCont.style.display = "block";
	});
	
	tabcanvas.addEventListener('tap', function() {
		this.classList.add('tap-active');
		tabBill.classList.remove('tap-active');
		listCont.style.display = "none";
		chart.style.display = "block";
	});
};

// 初始化定义
var picker = null,
	dtPicker = null,
	curYear = new Date().getFullYear(),//获取当前年
	curMonth = new Date().getMonth() + 1, //获取当前月
	selectStatus = document.querySelector('.change'), // 月/年 按钮
	selectDate = document.querySelector('.year-mon'); // xxxx-xx 按钮
	
// 初始化时间
function loadTime () {
	// 初始化PopPicker多级选择器
	picker = new mui.PopPicker(); 
	// 初始化时间日期插件
	dtPicker = new mui.DtPicker({type: 'month'}); 
	// picker.setData([{value:'zz',text:'智子'}]); //列表里设置值
	// 设置一些年月的数据
	picker.setData([{value:'month',text:'月'},{value:'year',text:'年'}]);

	curMonth = curMonth < 10 ? "0" + curMonth : curMonth; //个位数加0
	// selectDate.innerHTML = curYear + "-" + curMonth; //给显示日期加格式 xxxx-xx
};

// 点击时间
function timerSelect () {
	var selectStatus = document.querySelector('.change'); //年月
	var selectDate = document.querySelector('.year-mon'); //日期
	// 点击年月按钮
	selectStatus.addEventListener('tap', function() {
		console.log("年月按钮");
		picker.show(function (selectItems) {
			// console.log(selectItems[0].text);//年
			// console.log(selectItems[0].value);//year 
			// 点击年月按钮 切换选项中的值
			selectStatus.innerHTML = selectItems[0].text;
			// 判断 点击的是年还是月 
			var text = selectItems[0].text;
			// 取出时间日期的 显示的年月日时分节点
			var dtpickerTitle = document.querySelector('.mui-dtpicker-title')
				_yearH5 = document.querySelector("[data-id=title-y]"), // 年
				_monthH5 = document.querySelector("[data-id=title-m]"),// 月
				_mPicker = document.querySelector("[data-id=picker-m]"),
				_yPicker = document.querySelector("[data-id=picker-y]");
			
			if(text === '月') {
				// 显示格式xxxx-xx
				selectDate.innerHTML = curYear + "-" + curMonth;
				_monthH5.style.display = "inline-block";
				_mPicker.style.display = 'block';
				_yearH5.style.width = "50%";
				_yPicker.style.width = "50%";
			} else {  // text === 年
				// 显示格式xxxx
				selectDate.innerHTML = curYear;
				_monthH5.style.display = 'none';
				_mPicker.style.display = 'none';
				_yearH5.style.width = '100%';
				_yPicker.style.width = '100%';
			}
		});
	});
	// 点击时间按钮
	selectDate.addEventListener('tap', function() {
		console.log("时间按钮");
		
		dtPicker.show(function (selectItems) { 
			console.log(selectItems.y);//{text: "2016",value: 2016} 
			console.log(selectItems.m);//{text: "05",value: "05"} 
			selectDate.innerHTML = selectItems.y.text + '-' + selectItems.m.text;
		});
	});
};


// 点击addBtn跳转新增账单页
addBtn.addEventListener('tap', function () {
	location.href = './page/addBill.html'
});
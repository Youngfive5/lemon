require(['./config'], function(){
	require(['mui','jquery'], function (mui, $){
		mui.init();
		
		addEvent();
	});
});

function addEvent () {
	var money = document.querySelector('.money');
	//money.value = "0.00";
	
	mui('.keyword').on('tap', 'span', function() {
		// console.log(money.value.split('.')[1])
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
		
// 		else if (money.value.indexOf('.') != -1 ) {
// 			if( money.value.split('.')[1].lenght <= 1) {
// 				// 如果值有小数点 并且.后面长度为2
// 				console.log(money.value.split('.')[1].length);
// 				money.value = money.value;
// 			}else {
// 				// 在最后 所有判断出路完后 拼接金额
// 				money.value = money.value + text;
// 				// console.log(money.value.split('.')[1].length)
// 			}
// 			
// 		} 
		
		
	});
};
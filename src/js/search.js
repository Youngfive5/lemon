require(['./config'], function () {
	require(['mui','jquery'], function(mui, $) {
		searchBill();
	});
});

function searchBill() {
	btn.onclick = function () {
		if(inp.value === '') {
			alert('请输入搜索内容');
		} else {
			var intro = inp.value.trim();
			$.ajax({
				url: '/bill/api/searchBill',
				type: 'post',
				dataType: 'json',
				data: {
					intro : intro,
				},
				success: function(data) {
					if(data.code === 1) {
						var data = data.data;
						console.log(data);
						render(data);
					} else {
						alert(data.msg);
					}
				}
			});
		}
	};
};


// 渲染
function render (data) {
	console.log(data);
	var html = '';
	data.forEach(item =>{
		html += `<div class="bill-box">
					<span class="${item.icon}"></span>
					<span class="insert-intro">
						<p>${item.intro}</p>
						<span class="timer">
							<i class="mui-icon mui-icon-flag"></i>
							<i>${item.timer}</i>
						</span>
					</span>`
					if(item.type === "收入") {
						html += `<span class="insert-money income">${item.money}</span>`;
					} else if (item.type === "支出") {
						html += `<span class="insert-money expend">${item.money}</span>`;
					}
				html += `</div>`;
	});
	console.log(html);
	document.querySelector('.bill-cont').innerHTML = html;
};


// 返回主页
back.addEventListener('tap', function () {
	location.href = '/';
});
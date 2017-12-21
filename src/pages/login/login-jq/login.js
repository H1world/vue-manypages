$(function() {
	//二维码、PC登录切换
	// $('.login-switch').click(function(){
	// 	$(this).parent('div').hide().siblings().show();
	// });

	var st = $('.pc_login > section');
	//光标位置
	// st.eq(0).find('.user input').focus();
	//按下回车键，点击登录
	$(document).keyup(function(event){
		if(event.keyCode==13){
			let tablecode = sessionStorage.getItem('theTableCode');
			if(tablecode == 1){
				st.eq(0).find('button').click();
			};
			if(tablecode == 2){
				st.eq(1).find('button').click();
			};
			if(tablecode == 3){
				st.eq(2).find('button').click();
			};
		}
	});
	//点击角色选项卡
	$('.pc_login ul li').click(function(){
		//给自己加个样式
		$(this).siblings('li').removeClass('active');
		$(this).addClass('active');
		let tablecode = $(this).attr('code');
		sessionStorage.setItem('theTableCode',tablecode);
		// sessionStorage.setItem('theTableCode', $(this).attr('code'));
		// console.log(sessionStorage.getItem('theTableCode'));
		//下滑到响应位置
		$('.pc_login ul .sideline').animate({
			left:$(this).offset().left - $('.pc_login ul li').eq(0).offset().left + 30,
		},300);
		//显示相应登录框
		var index = $(this).index();
		st.removeClass('show');
		st.eq(index).addClass('show');
		// st.eq(index).find('.user input').focus();

		//console.log(index)
	});
});

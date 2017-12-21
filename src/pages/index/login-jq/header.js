$(function() {
	//Bootstrap菜单改为鼠标悬停显示下拉
	$(document).off('click.bs.dropdown.data-api');
	$('.navbar-right > li').mouseover(function() {
		$(this).addClass('open');
		$(this).find('.dropdown-menu').show();
	}).mouseout(function() {
		$(this).removeClass('open');
		$(this).find('.dropdown-menu').hide();
	});
	$('.dropdown-menu li').click(function() {
		$('.dropdown-menu').hide();
	});

})

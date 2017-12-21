<template lang="html">
	<header>
		<nav class="navbar-inverse">
			<div class="container">
				<!--Logo-->
				<div class="navbar-header">
					<a class="navbar-brand" href="http://www.xytzq.cn/"><img alt="投智圈" src="../assets/logo.png"></a>
				</div>
				<!--菜单-->
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

					<ul class="nav navbar-nav navbar-left">
						<li><router-link :to="{path:'/home'}">首页</router-link></li>
						<li><router-link :to="{path:'/demandList'}">需求大厅</router-link></li>
						<li><router-link :to="{path:'/studioList'}">工作室</router-link></li>
						<li><router-link :to="{path:'/eventList'}">赛事活动</router-link></li>
						<li><router-link :to="{path:'/courseMaterial'}">课程</router-link></li>
					</ul>

					<!--个人资料-->
					<ul class="nav navbar-nav navbar-right">
						<li class="head-portrait">
							<router-link :to="{path:'/personalDetails'}" class="img-circle">
								<img class="img-circle" alt="个人头像" src="../assets/nophoto.png">
								<span class="certified vip1"></span>
							</router-link>
						</li>
						<li class="dropdown">
							<router-link :to="{path:'/personalDetails'}" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">姓名 <span class="caret"></span></router-link>
							<ul class="dropdown-menu">
								<div class="plug"><span class="caret"></span></div>
								<li></li>
								<li><router-link :to="{path:'/personalDetails'}"><i class="fa fa-address-card-o"></i>个人资料</router-link></li>
								<li><router-link :to="{path:'/personalFriend'}"><i class="fa fa-address-book-o"></i>我的好友</router-link></li>
								<li><router-link :to="{path:'/personalOriginality'}"><i class="fa fa-pencil-square"></i>创新笔记</router-link></li>
								<li><router-link :to="{path:'/personalMessage'}"><i class="fa fa-cogs"></i>赛事消息 <span class="navbar-unread">10</span></router-link></li>
								<li><router-link :to="{path:'/personalUpdate'}"><i class="fa fa-bell-o"></i>修改密码</router-link></li>
								<li role="separator" class="divider"></li>
								<li><a @click='signOut()'><i class="fa fa-sign-out"></i>退出</a></li>
								<li></li>
							</ul>
						</li>
					</ul>
					<!-- end-->
				</div>
			</div>
		</nav>

	</header>
</template>

<script>
	
</script>
<template>
	<section class="page_404">
		<div class="container">
			<div class="row">	
				<div class="col-sm-12">
					<div class="col-sm-10 col-sm-offset-1 text-center ml-5">
						<div class="four_zero_four_bg">
							<h1 class="text-center">404</h1>
						</div>

						<div class="contant_box_404">
							<h3 class="h2">
								Kaybolmuş gibi görünüyorsun
							</h3>

							<p>Aradığın sayfa mevcut değil</p>

							<router-link to="/" class="link_404">Anasayfaya dön</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<style>

	.page_404{ 
		padding:21px 0; 
		background:#fff; 
	}

	.four_zero_four_bg{
		background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
		height: 400px;
		background-position: center;
	}

	.four_zero_four_bg h1{
		font-size:60px;
	}

	.four_zero_four_bg h3{
		font-size:80px;
	}

	.link_404{			 
		color: #fff!important;
		padding: 10px 20px;
		background: #39ac31;
		margin: 20px 0;
		display: inline-block;
	}

	.contant_box_404{ margin-top:-50px;}
</style>

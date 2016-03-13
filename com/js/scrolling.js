if ((btt_backtotop = document.getElementById("back-to-top")) != null){
	var btt_timer = -1;
	btt_backtotop.addEventListener("click", function(e){
		if (btt_timer < 0)
			btt_timer = setInterval(btt_onTimer, 10);
	});
	function getScrollTop(){
		return (document.documentElement) ? document.documentElement.scrollTop : document.body.scrollTop;
	}
	function btt_onTimer(e){
		var scrolltop = getScrollTop();
		if (scrolltop == 0){
			window.clearInterval(btt_timer);
			btt_timer = -1;
		}
		var inc = (scrolltop / 16);
		if (inc < 16) inc = 16;
		window.scrollBy(0, 0 - inc);
	}
	window.addEventListener("scroll", function(e){
		if (getScrollTop() >= (window.innerHeight / 2)) {
			btt_backtotop.style.display="block";
		} else {
			btt_backtotop.style.display="";
		}
	});	
}
if ((cmb_combotype = document.getElementsByClassName("combotype")).length > 0){
	for (var i = 0; i < cmb_combotype.length; ++i){
		cmb_combotype[i].addEventListener("click", function(e){
			var ele = e.target.parentElement;
			if (ele.clientHeight == "180") {
			  ele.style.height="";
			  e.target.innerHTML="详细标题部分(点击收起)";
			  setTimeout(function(){
				window.scrollTo(0, ele.offsetTop);
			  }, 100);
			} else {
			  ele.style.height="180px";
			  e.target.innerHTML="详细标题部分(点击展开)";
			}
		});
	}
};

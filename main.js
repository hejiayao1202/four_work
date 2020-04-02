function Swiper(){
    var $swiper=$("<div class='slider' id='slider'>"+
        "<div class='slide'><img src='img/b5.png' alt=''></div>"+
        "<div class='slide'><img src='img/b1.png' alt=''></div>"+
        "<div class='slide'><img src='img/b2.png' alt=''></div>"+
        "<div class='slide'><img src='img/b3.png' alt=''></div>"+
        "<div class='slide'><img src='img/b4.png' alt=''></div>"+
        "<div class='slide'><img src='img/b5.png' alt=''></div>"+
        "<div class='slide'><img src='img/b1.png' alt=''></div>"+
        "</div>"+
        "<span id='left'>&lt;</span>"+
        "<span id='right'>></span>"+
        "<ul class='nav' id='navs'>"+
            "<li class='active'>1</li>"+
            "<li>2</li>"+
            "<li>3</li>"+
            "<li>4</li>"+
            "<li>5</li>"+
        "</ul>"
    );
    this.show=function(conf){
        // DOM绘制
        var $box=$(conf.container);
        $box.append($swiper);

        // 获取节点
        var $left=$('#left');
        var $right=$('#right');
        var $slider=$('#slider');
        var $slide=$('.slide');
        var $navs=$('#navs li');
        var idx=0,timer;
        // console.log($slide.length,$navs.length);

        // nav滚动
        function navsGo(idx){
            for(var i=0;i<$navs.length;i++){
                $navs[i].removeAttribute("class","active");
            }
            $navs[idx].setAttribute("class","active");
        }
        // 向右滚动
        function rightGo(){
			if(idx==($slide.length-2)-1){
                $slider.animate({left:'-='+1200},1000,function(){
                    $slider.css('left',-1200);
                })
                navsGo(0);
                idx=0;
            }
            else{
                $slider.animate({left:'-='+1200},1000);
                navsGo(idx+1);
                idx++;
            }
        }
        // 向左滚动
        function leftGo(){
			if(idx==0){
                $slider.animate({left:'+='+1200},1000,function(){
                    $slider.css('left',-1200*($slide.length-2));
                })
                navsGo(($slide.length-2)-1);
                idx=($slide.length-2)-1;
            }
            else{
                $slider.animate({left:'+='+1200},1000);
                navsGo(idx-1);
                idx--;
            }
        }
        // 图片滚动
        timer=setInterval(rightGo,2000);
        // 鼠标移入
        $box.mouseover(function(){
            $left.css('opacity',0.7);
            $right.css('opacity',0.7);
            clearInterval(timer);
        })
        // 鼠标移出
        $box.mouseout(function(){
            $left.css('opacity',0);
            $right.css('opacity',0);
            timer=setInterval(rightGo,2000);
        })
        // 点击左箭头
        $left.click(leftGo);
        // 点击右箭头
        $right.click(rightGo);
        // nav点击
        for(var i=0;i<$slide.length-2;i++){
            (function(j){ 
                $navs[j].onclick=function(){ 
                    if(j-idx>0){
                        $slider.animate({left:'-='+1200*(j-idx)},1000);
                    }
                    else if(j-idx<0){
                        $slider.animate({left:'+='+1200*(idx-j)},1000);
                    }
                    else{
                        return true;
                    }
                    navsGo(j);
                    idx=j;
                 }
            })(i)
        }

    }
}

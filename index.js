// 主逻辑

function Barrel(ct){
	this.ct = ct || document.getElementsByTagName('body')[0]
	this.allData = []
	this.curNode = []
	this.nodeArr = []
	this.preNode = []
	this.totalWidth = 0;
	this.imgArr = [];
	this.ctWidth = parseInt(window.getComputedStyle(this.ct).width)-25;
	//一开始没有滚动条，所以这里减去假设的滚动条宽度，如果有需要，可以分别获取宽度，
	//然后进行比较，不相等则说明出现了滚动条，再重新以这个宽度去计算布局。
}

var barrel = new Barrel()

window.onload = function(){
	for( let i=0; i<20; i++){
		barrel.getImgUrl()
	}
}
let scrollClock;
window.onscroll = function(){
	if(scrollClock){
		clearTimeout(scrollClock);
	}
	scrollClock = setTimeout(function(){
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop; 
		var innerHeigth = window.innerHeigth
		var lastNode = document.querySelector('.imgBox:last-child') 
		var lastNodeTop = lastNode.offsetTop;
		if(lastNodeTop < innerHeight+scrollTop){
			for( let i=0; i<20; i++){
				barrel.getImgUrl()
			}
		}
	},100)
}

let resizeClock
window.onresize = function(){
	let _this = barrel
	if(resizeClock){
		clearTimeout(resizeClock)
	}
	resizeClock = setTimeout(function(){
		let imgArr = document.getElementsByClassName('imgBox');
		_this.ctWidth = parseInt(window.getComputedStyle(_this.ct).width)-25;
		console.log(_this.ctWidth)
		let img
		for(let i=0; i<imgArr.length; i++){
			img = imgArr[i].getElementsByTagName('img')[0]
			resizeRender(img)
		}
	},100)

	let rowArr = [];
	let totalWidth =0;
	function resizeRender(img){
		rowArr.push(img);
		img.style.height = '200px'
		let imgWidth = parseInt(window.getComputedStyle(img).width);
		let ratio = imgWidth/200;
		totalWidth +=imgWidth;
		if(totalWidth > _this.ctWidth){
			console.log('llll')
			rowArr.pop();
			reRender(rowArr,totalWidth-imgWidth)
			rowArr = [];
			rowArr.push(img)
			totalWidth = imgWidth;
		}


		function reRender(imgArr,totalWidth){
			console.log(imgArr,totalWidth)
			let newHeight = _this.ctWidth*200/totalWidth;
			console.log(newHeight)
			for(let i=0; i<imgArr.length; i++){
				imgArr[i].style.height = newHeight+'px';
			}
		}
		
	}
}







// 函数
// 

Barrel.prototype.getImgUrl = function(){
	let _this = this;
	let width = parseInt(Math.random()*400 +100)
	let height = parseInt(Math.random()*300 +150)
	let color = ''
	let img = new Image
	for(let i=0;i<6; i++){
		color += parseInt(Math.random()*16+1).toString(16)
	}
	var ImgUrl = 'https://via.placeholder.com/'+ width + 'x' + height + '/' +color
	img.src = ImgUrl
	img.onload = function(){
		_this.render(img)
	}
} 




Barrel.prototype.render = function(img){
	let _this = this;
	this.imgArr.push(img);
	let Ediv = document.createElement('div');
	Ediv.classList.add('imgBox')
	Ediv.appendChild(img);
	this.ct.appendChild(Ediv)
	img.style.height = '200px'
	let imgWidth = parseInt(window.getComputedStyle(img).width);
	let ratio = imgWidth/200;
	this.totalWidth +=imgWidth;
	if(this.totalWidth > this.ctWidth){
		this.imgArr.pop();
		reRender(this.imgArr,this.totalWidth-imgWidth)
		this.imgArr = [];
		this.imgArr.push(img)
		this.totalWidth = imgWidth;
	}


	function reRender(imgArr,totalWidth){
		let newHeight = _this.ctWidth*200/totalWidth;
		for(let i=0; i<imgArr.length; i++){
			imgArr[i].style.height = newHeight+'px';
		}
	}
	
}






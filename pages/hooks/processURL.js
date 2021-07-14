export function processUrl(UrlData){
	UrlData.forEach((item,index,arr)=>{
		// console.log(item.contentImg)
		let newitem = item.contentImg.replace(/\[|]'|'/g,"")
		let newitemLength = newitem.length - 1
		newitem = newitem.substr(0,newitemLength)
		let newArr = newitem.split(",")
		arr[index].contentImg = newArr
		// console.log(newitem)
		// console.log(newArr)
		// console.log(index)
		// console.log(arr[index].contentImg)
	})
}
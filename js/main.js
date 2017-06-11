function bookSearch() {
	var search = document.getElementById('search').value
	document.getElementById("results").innerHTML = ""
	console.log('search')


$.ajax ({
	url: "https://www.googleapis.com/books/v1/volumes?q=" + search,
	dataType: "json" ,
	maxResults: "20",

	success: function(data) {
		var results = document.getElementById("results")
		for(i=0; i<data.items.length; i++){
			var div = document.createElement("div")
			div.className = "book"
			results.appendChild(div)

			var text = document.createElement("div")
			text.className = "text"

			var image = document.createElement("img")
			image.src += data.items[i].volumeInfo.imageLinks.thumbnail
			image.className = "thumbnail"
			div.appendChild(image)
			var titleText = document.createTextNode(data.items[i].volumeInfo.title)
			var title = document.createElement("h3")
			title.appendChild(titleText)
			text.appendChild(title)
			div.appendChild(text)

			var authorsText = document.createTextNode(data.items[i].volumeInfo.authors)
			var authors = document.createElement("h4")
			authors.appendChild(authorsText)
			text.appendChild(authors)

			var descriptionText = document.createTextNode(data.items[i].searchInfo.textSnippet)
			var description = document.createElement("h5") 
			description.appendChild(descriptionText)
			text.appendChild(description)

			var btn = document.createElement("button")
			var textLink = document.createElement("a")
			var moreInfo = document.createTextNode("more info")
			btn.className = "moreInfo"
			textLink.href += data.items[i].saleInfo.buyLink

			if (data.items[i].saleInfo.buyLink === "undefined") {
				text.href += "https://www.amazon.com/b/ref=sr_aj?node=283155&ajr=0"
				console.log("works")
			}
			textLink.target += " _blank"
			textLink.appendChild(moreInfo)
			btn.appendChild(textLink)
			div.appendChild(btn)
			console.log(data.items[i])





			//results.innerHTML += "<h2>" + data.items[i].volumeInfo.title + "</h2>"
		}
		
	},

	type: 'GET'

});

}
$("#search").keyup(function(event){
	if(event.keyCode ==13) {
		$("#button").click();
	}
});

document.getElementById('button').addEventListener('click', bookSearch, false)

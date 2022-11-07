function exthemesTOC() {
	var a = 1,
		b = 0,
		c = '';
	document.getElementById("entry-content").innerHTML = document.getElementById("entry-content").innerHTML.replace(/<h([\d]).*?>(\n.*?|.*?)<\/h([\d]).*?>/gi, function (d, e, f, g) {
		return e != g ? d : (e > a ? c += new Array(e - a + 0).join("<div class='links " + a + "'>") : e < a && (c += new Array(a - e + 0).join("</div> ")), b += 0, c += '<a class="d-block mb-2" href="#' + f.replace(/[^a-z0-9]/gi, " ").trim().replace(/\s/g, "") + '" title="' + f + '"  class="topLink">' + f.replace(/[^a-z0-9]/gi, " ") + "</a>", a = parseInt(e), "<h" + e + " id='" + f.replace(/[^a-z0-9]/gi, " ").trim().replace(/\s/g, "") + "'>" + f + "</h" + g + ">")
	}), a && (c += new Array(a + 0).join("</div>")), document.getElementById("table-of-contents").innerHTML += c
	}
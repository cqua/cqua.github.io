function attach_collapsables() {
	var coll = document.getElementsByClassName("collapse-button");
	var i;
	
	for (i = 0; i < coll.length; i++) {
	  coll[i].addEventListener("click", function() {
		 this.classList.toggle("active");
		 this.nextElementSibling.classList.toggle("open");
	  });
	}
}
var img = document.getElementsByClassName('modal-img');

for (let i = 0; i < img.length; i++) {
  img[i].title=img[i].getAttribute("alt");
	img[i].setAttribute('data-bs-target', '#modal-'+i)
	img[i].setAttribute('data-bs-toggle', 'modal')

	let modal = document.createElement("div");
	modal.classList.add('modal');
	modal.setAttribute('id','modal-'+i);
	modal.setAttribute('tabindex','-1');
	modal.setAttribute('aria-hidden','true');
	
	let modaldialog = document.createElement("div");
	modaldialog.classList.add('modal-dialog');
	modaldialog.classList.add('modal-dialog-centered');
	
	let modalcontent = document.createElement("div");
	modalcontent.classList.add('modal-content');
	
	let modalimg = document.createElement("img");
	modalimg.src=img[i].src.replace('_small','');
	modalimg.setAttribute('alt',img[i].getAttribute("alt"));
	modalimg.setAttribute('title',img[i].getAttribute("alt"));
	
	modalcontent.appendChild(modalimg);
	
	if (img[i].hasAttribute("caption")) {
		let caption=img[i].getAttribute("caption");
		let figcaption = document.createElement("figcaption");
		figcaption.classList.add('figure-caption');
		figcaption.innerHTML=img[i].getAttribute("caption")
		modalcontent.appendChild(figcaption.cloneNode(true));
		figcaption.setAttribute('style','width:'+img[i].width+'px');
		img[i].after(figcaption);
	} else {
		let figcaption = document.createElement("figcaption");
		figcaption.classList.add('figure-caption');
		figcaption.innerText=img[i].getAttribute("alt");
		modalcontent.appendChild(figcaption);
	}
	
	modaldialog.appendChild(modalcontent);
	modal.appendChild(modaldialog);
	
  img[i].after(modal);
}
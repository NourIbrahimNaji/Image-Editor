let sat = document.getElementById("sat")
let con = document.getElementById("con")
let br = document.getElementById("br")
let sepia = document.getElementById("sepia")
let gray = document.getElementById("gray")
let blur = document.getElementById("blur")
let hue = document.getElementById("hue")

let upload = document.getElementById("upload")
let download = document.getElementById("download")
let img = document.getElementById("img")
let reset = document.querySelector("span")
let imgBox = document.querySelector(".img_box")


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d')

function resrtValue(){
    ctx.filter = 'none'
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
    sat.value = '100'
    con.value = '100'
    br.value = '100'
    sepia.value = '100'
    gray.value = '0'
    blur.value = '0'
    hue.value = '0'

}

window.onload = function(){
    download.style.display='none';
    reset.style.display='none';
    imgBox.style.display='none';
}

upload.onchange = function(){
    resrtValue();
    download.style.display='block';
    reset.style.display='block';
    imgBox.style.display='block';

    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = function(){
      img.src = file.result;  
    }
    img.onload = function(){
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
        img.style.display = 'none';
    }
}

let filters = document.querySelectorAll("ul li input");
filters.forEach( filter =>{
    filter.addEventListener('input' , function(){
        ctx.filter = `
            saturate(${sat.value}%)
            contrast(${con.value}%)
            brightness(${br.value}%)
            sepia(${sepia.value}%)
            grayscale(${gray.value})
            blur(${blur.value}px)
            hue-rotate(${hue.value}deg)

        `
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
    })
})

download.onclick = function(){
    download.href = canvas.toDataURL();
}
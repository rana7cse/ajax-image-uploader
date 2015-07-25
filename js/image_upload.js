var _img = _gx('_img_file'),
    _img_output = _gx('_img_show'),
    _progress_bar = _gx('_img_progress'),
    _upload_btn = _gx('_img_upload');

function _gx(id){
    return document.getElementById(id);
}

function _validImage(file){
    switch(file.type){
        case "image/png" : return true;
        case "image/jpeg" : return true;
        case "image/gif" : return true;
        default : return false;
    }
}

function showImage(){
    _progress_bar.parentNode.setAttribute('class','progress');
    if(_validImage(_img.files[0])){
        var fileRead = new FileReader();
        fileRead.onload = function(e){
            _img_output.src = e.target.result;
        }
        fileRead.readAsDataURL(_img.files[0]);
    }else{
        alert("Please Check Your File Format (jpg,jpeg,png,gif)");
        _img.value = '';
        _img_output.src = '';
    }
}

function uploadImage(){
    if(_img.value == ''){
        alert("You didn't select any valid file ! Poko Poko :) !");
        return 0;
    }

    var myData = new FormData();
        myData.append('my_image',_img.files[0]);

    var ajAx = new XMLHttpRequest();
        ajAx.onreadystatechange = function(){
            if(ajAx.readyState == 4 && ajAx.status == 200){
                try{
                    var resp = ajAx.response;
                } catch (e){
                    var resp = {
                        "status" : "error",
                        "error" : ajAx.responseText
                    }
                }
                console.log(resp);
            }
        }

        ajAx.upload.addEventListener('progress',function(e){
            var bar_box = _progress_bar.parentNode;
                bar_box.setAttribute('class','progress on');
            _progress_bar.style.width = Math.ceil(e.loaded/ e.total)*100+'%';
        },false);

        ajAx.open("POST",'php/upload_image.php');
        ajAx.send(myData);
}

_img.addEventListener('change',showImage);
_upload_btn.addEventListener('click',uploadImage);
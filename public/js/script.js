$(document).ready(function() { 
//查找box元素,检测当粘贴时候,
    document.querySelector('#overview').addEventListener('paste', function(e) {
        //判断是否是粘贴图片
        if (e.clipboardData && e.clipboardData.items[0].type.indexOf('image') > -1) 
        {
            var that      = this,
                reader   = new FileReader();
                file     = e.clipboardData.items[0].getAsFile();
            reader.onload = function(e) 
            {
                var xhr = new XMLHttpRequest(),
                    fd  = new FormData();
                xhr.open('POST', '../upload_attachments', true);
                xhr.onload = function () 
                {
                    var img = new Image();
                    img.src = "../attachments/"+xhr.responseText;
                    $('#overview').html($('#overview').html()+"<img class='userpreview_img' src='"+img.src+"'>");

                }
                window.URL = window.URL || window.webkitURL;
                var blobUrl = window.URL.createObjectURL(file);
                fd.append('file',this.result); 
                var picname=Date.now();
                fd.append('description',picname);
                $('#overview').html($('#overview').html()+ '[!!"'+picname+'"!!]'+'');
                xhr.send(fd);
            }
            reader.readAsDataURL(file);
        }
    }, false);

});
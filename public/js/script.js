//查找box元素,检测当粘贴时候,
    document.querySelector('#overview').addEventListener('paste', function(e) {
        //判断是否是粘贴图片
        if (e.clipboardData && e.clipboardData.items[0].type.indexOf('image') > -1) 
        {
            var that      = this,
                reader   = new FileReader();
                file     = e.clipboardData.items[0].getAsFile();
            //ajax上传图片
            reader.onload = function(e) 
            {
                var xhr = new XMLHttpRequest(),
                    fd  = new FormData();
                xhr.open('POST', '../upload_attachments', true);
                xhr.onload = function () 
                {
                    var img = new Image();
                    img.src = "../attachments/"+xhr.responseText;
                    that.innerHTML += '<img src="'+img.src+'" alt=""/>';
                       //https://172.16.1.111:8443/report/4/attachments/11
                    //document.getElementById("overview").value = img.src;
                }
                // this.result得到图片的base64 (可以用作即时显示)

                window.URL = window.URL || window.webkitURL;
                var blobUrl = window.URL.createObjectURL(file);
                //fd.append('file', this.result); 
                console.log(this.result);
                fd.append('file',this.result); 
                var picname=Date.now();
                fd.append('description',picname);
                that.innerHTML = '[!!"'+picname+'"!!]'+'';
                xhr.send(fd);
            }
            reader.readAsDataURL(file);
        }
    }, false);


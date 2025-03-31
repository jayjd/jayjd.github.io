


function checkIPConnection() {
    const ip = document.getElementById('ip_address').value.trim();
    
    // 简单的IP地址格式验证
    const ipPattern = /^(\d{1,3}\.){2}\d{1,3}(\.\d{1,3})?$/;
    if (!ipPattern.test(ip)) {
        alert('请输入有效的IP地址');
        return;
    }
    document.getElementById('loadingToast').style.display = 'block';
    // 心跳间隔时间（单位：毫秒）
    const heartbeatInterval = 30000; // 30秒
    let heartbeatTimer;
    // 创建 WebSocket 连接
    const ws = new WebSocket(`wss://${ip}:8283`);

    ws.onopen = () => {
        document.getElementById('loadingToast').style.display = 'none';
        console.log('WebSocket 连接成功');
        // 启动心跳
        heartbeatTimer = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send('heartbeat'); // 发送心跳消息
                console.log('发送心跳包');
            }
        }, heartbeatInterval);
    };

    ws.onmessage = (event) => {
        console.log('收到消息:', event.data);
    };

    ws.onerror = (error) => {
        document.getElementById('loadingToast').style.display = 'none';
        console.error('WebSocket 错误:', error);
    };

    ws.onclose = () => {
        document.getElementById('loadingToast').style.display = 'none';
        console.log('WebSocket 连接关闭');
        // 清除心跳定时器
        if (heartbeatTimer) {
            clearInterval(heartbeatTimer);
        }
    };

}
// 通用函数优化
function doAction(action, kv) {
    const ip = document.getElementById('ip_address').value.trim();
    const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipPattern.test(ip)) {
        alert('请输入有效的IP地址');
        return false;
    }
    kv['do'] = action;
    // 使用相对协议
    const url = `//${ip}:8383/action`;
    
    // alert(JSON.stringify(kv));
    $.post(url, kv, function (data) {
        console.log(data);
        alert(data);
    }).fail(function(error) {
        console.error('请求异常:', error);
        alert(error.status+':'+error.statusText);
        // 你可以在这里添加更多的异常处理逻辑，例如显示错误提示给用户
        // alert('请求发生错误，请稍后重试');
    });
    return false;
}

// 推送相关函数优化
const pushFunctions = {
    DyPush: () => doAction('DyPush', { word: document.getElementById('search_key_word').value }),
    HDKPush: () => doAction('HDKPush', { word: document.getElementById('search_key_word').value }),
    CookiePush: () => doAction('CookiePush', { word: document.getElementById('cookie_key_word').value }),
    DouYuPush: () => doAction('DouYuPush', { word: document.getElementById('search_key_word').value }),
    TvLivePush: () => doAction('TvLivePush', { word: document.getElementById('tv_key_word').value }),
    FanLivePush: () => doAction('FanLivePush', { word: document.getElementById('tv_key_word').value })
};

// 文件下载优化
function downloadFile() {
    const ip = document.getElementById('ip_address').value.trim();
    const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipPattern.test(ip)) {
        alert('请输入有效的IP地址');
        return false;
    }
    const fileUrl = `https://${ip}:8383/collection_data.json`;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'collection_data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 文件操作相关优化
const fileOperations = {
    current_root: '',
    current_parent: '',
    current_remote: '',
    current_file: '',

    selectFile(path, canDel) {
        this.current_file = path;
        document.getElementById('delFileBtn').style.display = canDel ? 'block' : 'none';
        document.getElementById('fileUrl1').value = `clan://localhost/${path}`;
        document.getElementById('fileUrl2').value = `${this.current_remote}${path}`;
        document.getElementById('fileInfoDialog').style.display = 'block';
    },

    async listFile(path) {
        document.getElementById('loadingToast').style.display = 'block';
        try {
            const response = await fetch(`/file/${path}`);
            const info = await response.json();
            this.current_root = path;
            this.current_parent = info.parent;
            this.current_remote = info.remote;

            this.updateFileList(info);
        } catch (error) {
            console.error('获取文件列表失败:', error);
            this.warnToast('读取本地文件失败，可能没有存储权限');
        } finally {
            document.getElementById('loadingToast').style.display = 'none';
        }
    },

    updateFileList(info) {
        const fileList = document.getElementById('file_list');
        fileList.innerHTML = '';

        if (info.parent !== '.') {
            fileList.appendChild(this.createFileNode('..', '', info.parent, true));
        }

        document.getElementById('delCurFolder').style.display = info.del === 1 ? 'block' : 'none';

        info.files.forEach(node => {
            fileList.appendChild(this.createFileNode(node.name, node.time, node.path, node.dir === 1));
        });
    },

    createFileNode(name, time, path, isDir) {
        const node = document.createElement('div');
        node.className = 'file-item';
        node.innerHTML = `
            <img src="${isDir ? ic_dir : ic_file}" alt="" class="file-icon">
            <div class="file-info">
                <span class="file-name">${name}</span>
                <span class="file-time">${time}</span>
            </div>
        `;
        node.onclick = () => isDir ? this.listFile(path) : this.selectFile(path, true);
        return node;
    },

    warnToast(msg) {
        const toast = document.getElementById('warnToast');
        toast.textContent = msg;
        toast.style.display = 'block';
        setTimeout(() => toast.style.display = 'none', 1000);
    }
};

// 文件上传优化
function uploadFile() {
    // 清空文件选择器的值，确保每次点击都能触发 onchange 事件
    const fileInput = document.getElementById('file_uploader');
    fileInput.value = ''; // 清空文件选择器的值
    fileInput.click(); // 触发文件选择对话框
}

function uploadTip() {
    const files = document.getElementById('file_uploader').files;
    if (files.length <= 0)
        return false;
    let tip = '';
    for (var i = 0; i < files.length; i++) {
        tip += (files[i].name) + ',';
    }
    $('#uploadTipContent').html(tip);
    $('#uploadTip').show();
}

function doUpload(yes) {
    $('#uploadTip').hide();
    if (yes === 1) {
        const files = document.getElementById('file_uploader').files;
        if (files.length > 0) {
            const formData = new FormData();
            formData.append('path', fileOperations.current_root);
            Array.from(files).forEach((file, i) => {
                formData.append(`files-${i}`, file);
            });
            const ip = document.getElementById('ip_address').value.trim();
            const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
            if (!ipPattern.test(ip)) {
                alert('请输入有效的IP地址');
                return false;
            }
            $('#loadingToast').show();

            $.ajax({
                url: `https://${ip}:8383/upload`,
                type: 'post',
                data: formData,
                processData: false,
                contentType: false,
                success: function () {
                    $('#loadingToast').hide();
                    $('#uploadTipOk').show();
                },
                error: function (xhr, status, error) {
                   console.error('上传异常:', error);
                   alert(error.status+':'+error.statusText);
                },
                complete: function () {
                    $('#loadingToast').hide();
                    $('#uploadTipOk').show();
                }
            });
        }
    }else{
        $('#uploadTipOk').hide();
    }
}

// 初始化事件监听
document.addEventListener('DOMContentLoaded', () => {
    // 绑定按钮事件
    document.querySelectorAll('.btn').forEach(btn => {
        const action = btn.dataset.action;
        if (action && pushFunctions[action]) {
            btn.onclick = pushFunctions[action];
        }
    });

    // 绑定文件上传事件
    document.getElementById('file_uploader').onchange = uploadTip;
});
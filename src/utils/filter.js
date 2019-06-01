//时间戳转日期
function formatTimeStamp(timeStamp,type){
    if(!timeStamp){
        return '';
    }
    var time = new Date((timeStamp+'').length<13?timeStamp*1000:timeStamp);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    if(type){
        return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
    }else{
        return y+'-'+add0(m)+'-'+add0(d);
    }
}
//不足10补零
function add0(m){
    return m<10?'0'+m:m 
}

//用户账号状态
function userStatus(type){
    if(type==0){
        return '未注册完全'
    }else if(type==1){
        return '正常'
    }else if(type==-1){
        return '禁用'
    }
}

//性别
function sexStatus(type){
    return type==0?'女':type==1?'男':'未知';
}
//订单类型
function orderStatus(type){
    switch(type){
        case '1':
        return '代付款';
        break;
        case '2':
        return '代发货';
        break;
        case '3':
        return '已发货';
        break;
        case '4':
        return '退单'
        break;
        case '5':
        return '交易成功'
        break;
    }
}
// 订单类型按钮颜色
function payStatus(status){
    switch(status){
        case '1':
        return 'info';
        break;
        case '2':
        return 'primary';
        break;
        case '3':
        return 'warning';
        break;
        case '4':
        return 'danger'
        break;
        case '5':
        return 'success'
        break;
    }
}

//数组深拷贝
function copyArray(arr,result){
    var arr=arr || [];
    var result = result || [];
    for(var i = 0; i < arr.length; i++){
      if(arr[i] instanceof Array){
        result[i] = [];
        copyArray(arr[i],result[i]);
      }else{
        result[i] = arr[i];
      }      
    }
    return result;
  }



  /**
     * 解决分页最后一条数据删除，页码超出的情况
     * @param {number} page 页码
     * @param {number} limit 每页条数
     * @param {number} tot 总条数
     */
    function pagination(page,limit,tot){
        console.log(page)
        if(tot%limit===1 && page!=1){
            let p=parseInt(tot/limit)+1;
            if(page>=p){
                return page-1;
            }else{
                return page;
            }
            
        }else{
            return page;
        }
    }

    /**
     * 根据code返回地址数组
     */
    // function formatCode(code){
    //     console.log(code)
    //     let arr=[];
    //     if(code.slice(0,))
    // }
    //用户账号状态
function withdrawStatus(status){
    switch(status){
        case '0':
        return 'warning';
        break;
        case '1':
        return 'primary';
        break;
        case '2':
        return 'success';
        break;
        case '3':
        return 'danger'
        break;
        case '4':
        return 'danger'
        break;
    }
}

function withdrawText(status){
    switch(status){
        case '0':
        return '待审核';
        break;
        case '1 ':
        return '已审核';
        break;
        case '2':
        return '已打款';
        break;
        case '3':
        return '审核未通过'
        break;
        case '4':
        return '打款失败'
        break;
    }
}


export default{
    formatTimeStamp,
    userStatus,
    sexStatus,
    copyArray,
    orderStatus,
    payStatus,
    pagination,
    withdrawStatus,
    withdrawText,
}


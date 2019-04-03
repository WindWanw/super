//手机号验证
const checkPhone=(rule, value, callback)=>{
    if (!value) {
        return callback(new Error('手机号不能为空'));
      }else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error('请输入正确的手机号'));
        }
      }
}

const checkId=(rule,value,cb)=>{
  if (!value) {
    return cb(new Error('身份证号码不能为空'));
  }else{
    const reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    if(reg.test(value)){
      cb();
    }else{
      return cb(new Error('请输入正确的身份证号码'));
    }
  }
  
}
export default{
    checkPhone,
    checkId
}
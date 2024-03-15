const crypto = require('crypto');

export default function(pwd : String){
    pwd = pwd ?? '';
    const hashedPwd = crypto.scryptSync(pwd,'llavesecreta', 24);
    return hashedPwd.toString('hex');
}
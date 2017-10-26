const pool = require('../mysql-pool');
const request = require('superagent');
const config = {
    appid: '123',
    secret: '123',
}

let fn_index = async(ctx, next) => {
    if (ctx.query.code) {
        let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${config.appid}&secret=${config.secret}&js_code=${ctx.query.code}&grant_type=authorization_code`;
        let code = await request.get(url);
        let userid = JSON.parse(code.text).openid;
        let user = JSON.parse(ctx.query.user);
        ctx.response.status = 200;
        ctx.response.body = userid;
        //---判断数据库是否存在user状态
        let [row] = await pool.execute('select * from `user` where `userid` = ?', [userid]).catch(e => console.log(e));
        console.log(row);
        if (Object.keys(row).length == 0) {
            //---插入新user
            let [row] = await pool.execute('insert into `user`(`userid`,`headimg`,`nickname`,`articlesnum`,`likednum`,`commnum`) values(?,?,?,0,0,0)', [userid, user.avatarUrl, user.nickName]).catch(e=>console.log(e));
            console.log(row);
        }
    }
}




module.exports = {
    'GET /signin': fn_index,
};
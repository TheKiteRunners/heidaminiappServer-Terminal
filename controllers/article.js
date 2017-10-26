const pool = require('../mysql-pool');

let insertArticle = async(ctx, next) => {
  let contents = ctx.request.body.contents,
    userid = ctx.request.body.userid,
    nickname = ctx.request.body.nickname,
    times = ctx.request.body.times,
    headimg = ctx.request.body.headimg,
    anonymous = parseInt(ctx.request.body.anonymous);
  let [row] = await pool.execute('insert into `article`(`userid`, `nickname`, `headimg`,`contents`, `likednum`, `commnum`, `times`, `anonymous`) values(?,?,?,?,0,0,?,?)', [userid, nickname, headimg, contents, times, anonymous]).catch(e => console.log(e));
  console.log(row);
  ctx.response.status = 200;
  ctx.response.body = `ok`;
};

let getArticle = async(ctx, next) => {
  let [row] = await pool.execute('select * from `article` order by articleid desc limit ?,5', [parseInt(ctx.query.index)]).catch(e => console.log(e));
  console.log(row);
  ctx.response.status = 200;
  ctx.response.body = JSON.stringify(row);

};

module.exports = {
  'POST /inserta': insertArticle,
  'GET /geta': getArticle
};

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: '小学生算数' });
};

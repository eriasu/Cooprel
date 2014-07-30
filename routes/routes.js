/**
 * Created by Elias on 2014/07/29.
 */
module.exports = function(app,passport){
    app.get('/',function(req,res){
       res.render('index.ejs');
    });
    app.get('/login',function(req,res){
       res.render('login.ejs',{message:req.flash('loginMessage')});
    });
    app.get('/logout',function(req,res){
       req.logout();
        res.redirect('/')
    });
    //app.get('/signup',function(req,res){
      // res.render('signup.ejs',{message:req.flash('signupMessage')});
    //});
   // app.post('/signup',passport.authenticate('local-signup',{successRedirect:'/Mapa',failureRedirect:'/signup',faulreFlash:true}));
    app.get('/Mapa',isLoggedIn,function(req,res){
       res.render('Mapa.ejs',{
           user:req.user
       }) ;
    });
    app.post('/login',passport.authenticate('local-login',{
        successRedirect:'/Mapa',
        failureRedirect:'/login',
        failureFlash:true
    }));
};
function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
        return next();
    res.redirect('/');
}
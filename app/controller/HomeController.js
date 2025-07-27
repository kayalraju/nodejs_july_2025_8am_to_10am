

class HomeController{


    async hpmePage(req,res){
        res.send('Home Page');

    }

    async aboutPage(rea,res){
        res.send('About Page');
    }
}

module.exports= new HomeController();
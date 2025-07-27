const { name } = require("ejs");


class HomeController{


    async hpmePage(req,res){
        try{
            res.render('home',{
                title:"home page"
            })
        }catch(error){
            console.error('Error in homePage:', error);
            
        }

    }

    async aboutPage(rea,res){
       try{
            res.render('about',{
                title:"about page",
                user:{
                    name : "John Doe",
                    age: 30,
                    email: "jon@gmail.com"
                }
            })
        }catch(error){
            console.error('Error in homePage:', error);
            
        }
    }
}

module.exports= new HomeController();
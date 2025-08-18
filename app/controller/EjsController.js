
const Student=require('../model/student')


class EjsController{

    async listStudent(req,res){
        try{
             const student= await Student.find()
            res.render('list',{
                title:'list page',
                data:student
            })

        }catch(error){
            console.log(error);
            
        }
    }

    async addStudent(req,res){
        try{
            res.render('addstudent',{
                title:'list page'
            })

        }catch(error){
            console.log(error);
            
        }
    }

    async createStudent(req,res){
        try{
            const {name,email,phone}=req.body
           const student= new Student({
                name,email,phone
            })

            const data=await student.save()
            if(data){

                return res.redirect('/student/list')
            }

        }catch(error){
            console.log(error);
            
        }
    }

    


}

module.exports=new EjsController()
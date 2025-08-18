const StatusCode = require("../helper/StatusCode");
const Student=require('../model/student')


class ApiController{

    //create Student
    async createStudent(req,res){
        try{
            //console.log(req.body);
            const {name,email,phone}=req.body
           const student= new Student({
                name,email,phone
            })

            const data=await student.save()

           return res.status(StatusCode.Create).json({
                status:true,
                message:"Data Added Successfully",
                data:data
            })

        }catch(error){
           return res.status(StatusCode.Server_Error).json({
                error:error.message
            })
        }

    }

    //get all student
    async getallStudent(req,res){
        try{
           const student= await Student.find()
            return res.status(StatusCode.OK).json({
                status:true,
                message:"Data fetch Successfully",
                total:student.length,
                data:student
            })

        }catch(error){
           return res.status(StatusCode.Server_Error).json({
                error:error.message
            })
        }

    }

    //edit student
    async singleStudent(req,res){
        try{
            const id =req.params.id
           const edit= await Student.findById(id)
           return res.status(StatusCode.OK).json({
                status:true,
                message:"get single data",
                data:edit
            })

        }catch(error){
           return res.status(StatusCode.Server_Error).json({
                error:error.message
            })
        }

    }

    //update student

    async updateStudent(req,res){
        try{
            const id=req.params.id
            const {name,email,phone}=req.body
            const data= await Student.findByIdAndUpdate(id,{
                name,
                email,
                phone
            })
            return res.status(StatusCode.OK).json({
                status:true,
                message:"Data updated successfully",
            })

        }catch(error){
           return res.status(StatusCode.Server_Error).json({
                error:error.message
            }) 
        }
    }

//delete student
    async deleteStudent(req,res){
        try{
            const id=req.params.id
            
            await Student.findByIdAndDelete(id)
           return  res.status(StatusCode.OK).json({
                status:true,
                message:"Data deleted successfully",
            })

        }catch(error){
           return res.status(StatusCode.Server_Error).json({
                error:error.message
            }) 
        }
    }
}

module.exports=new ApiController()
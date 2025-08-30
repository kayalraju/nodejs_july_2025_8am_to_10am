const StatusCode = require("../helper/StatusCode");
const Student=require('../model/student')


class ApiController{

    //create Student
    async createStudent(req,res){
        try{
           // console.log('image',req.file);
            
            //console.log(req.body);
            const {name,email,phone}=req.body

            const is_matched=await Student.findOne({email})
            if(is_matched){
                return res.status(StatusCode.Server_Error).json({
                    status:false,
                    message:"Email already exists"
                })
            }

           const student= new Student({
                name,email,phone
            })
            if(req.file){
                student.image=req.file.path
            }

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



    async searchStudent(req,res){
        try{
            let query={}
            if(req.body.search){
                const search= req.body.search
                query={
                     //name:{$regex:search,$options:'i'}
                     $or:[
                         {name:{$regex:search,$options:'i'}},
                         {email:{$regex:search,$options:'i'}},
                         {phone:{$regex:search,$options:'i'}}
                     ]
                }
            }
            const getStudent= await Student.find(query)
            return res.status(StatusCode.OK).json({
                status:true,
                message:"Data fetched successfully",
                total:getStudent.length,
                data:getStudent
            })

        }catch(error){
            return res.status(StatusCode.Server_Error).json({
                error:error.message
            })
        }
    }



}

module.exports=new ApiController()
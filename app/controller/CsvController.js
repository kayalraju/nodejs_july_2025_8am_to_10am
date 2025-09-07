const CsvModel = require('../model/csvModel')
const csv = require('csvtojson');
const path = require('path');



class CsvController {
    async createCsvdata(req, res) {
        try {
            const userData = [];
            csv().fromFile(req.file.path)
                .then(async (response) => {
                    for (let i = 0; i < response.length; i++) {
                        userData.push({
                            name: response[i].name,
                            age: response[i].age,
                            email: response[i].email
                        })
                    }
                    const data = await CsvModel.insertMany(userData)
                    return res.status(201).json({
                        status: true,
                        message: "CSV data inserted successfully",
                        data: data
                    })

                })


        } catch (error) {

        }

    }


    async getCsvdata(req, res) {
        try {
            const data = await CsvModel.find()
            return res.status(200).json({
                status: true,
                message: "CSV data fetched successfully",
                data: data
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                error: error.message
            })
        }
    }

}

module.exports = new CsvController();
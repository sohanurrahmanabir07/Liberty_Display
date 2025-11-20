const { Admin } = require("../Model/admin")
const bcrypt = require('bcryptjs')
const register = async (req, res) => {
    try {
        const { email, password } = req.body
        const hash = await bcrypt.hash(password, 10)
        req.body.password = hash
        const find = new Admin(req.body)
        const result = await find.save()

        if (result) {
            res.send({
                'message': 'Registered Successfull wait for approval'
            })
        }

    } catch (error) {
        res.send({
            'message': error.message
        })

    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const find = await Admin.find({ email: email })

        
        if (find.length) {
            // const result=await bcrypt.compare(password,find[0].password)

            if (find[0].password == password) {
                return res.send({
                    'message': 'Login Successful',
                    'user': find[0]
                })
            } else {
               return res.status(401).send({
                    'message': 'Password Wrong'
                })
            }

            // if (find) {

            //     res.send({
            //         'message': 'Login Successful',
            //         'user': find[0]
            //     })
            // } else {
            //     res.status(401).send({
            //         'message': 'Password Wrong'
            //     })
            // }
        }
        return res.status(401).send({
            'message': 'Admin Not Found'
        })

    } catch (error) {
        res.status(500).send({
            'message': error.message
        })
    }
}

module.exports = {
    register, login
}
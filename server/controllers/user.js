const bcrypt = require('bcryptjs')
let id = 10

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        const profile_pic = `https://robohash.org/${username}.png`
        const [checkUser] = await db.user.find_user_by_username(username)
        console.log(checkUser)
        if(checkUser != undefined){
            return res.status(409).send(`That username has already been registered!`)
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const [user] = await db.user.create_user(id, username, hash, profile_pic)
        console.log(user)
        id++
        return res.status(200).send(req.session.user)
    },
    login: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        const [user] = await db.user.find_user_by_username(username)
        if(!user) {
            return res.status(401).send('Username or password is incorrect')
        }
        const isAuthenticated = bcrypt.compareSync(password, user.password)
        console.log(isAuthenticated)
        if(!isAuthenticated) {
            return res.status(401).send('Username or password is incorrect')
        }
        req.session.user = {id:user.id}
        delete user.password
        return res.status(200).send(req.session.user)
    },
    getUser: (req, res) => {
        if(!req.session.user){
            return res.status(404).send('User not found')
        }
        return res.status(200).send(req.session.user)
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }
}
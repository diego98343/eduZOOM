

const getAllUsers = async(req, res)=>{
    res.send('get all users')
}


const getSingleUser = async(req, res)=>{
    res.send('get single user')
}


const showCurrentUser = async(req, res)=>{
    res.send('show current user')
}

const updateUser = async(req, res)=>{
    res.send('update user')
}


const updateUserPassWord = async(req, res)=>{
    res.send('update user password')
}


module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassWord
}



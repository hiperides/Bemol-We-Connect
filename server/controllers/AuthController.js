const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const consts = require('../consts');
const jwt = require('jsonwebtoken');

module.exports = {
    register: async function (req, res) {
        try {
            let u = await UserModel.findOne({ email: req.body.email });
            if (!u) {
                const user = new UserModel(req.body);
                user.senha = bcrypt.hashSync(req.body.senha, consts.bcryptSalts)
                await user.save();
                delete user.senha;
                res.status(200).json(user);
            }
            else {
                res.status(403).json({ message: 'Este E-mail já foi registrado!', error: {} });
            }
        }
        catch (e) {
            res.status(500).json({ message: 'Erro enquanto salvava o usuário', error: e });
        }
    },
    login: function (req, res) {
        const senha = req.body.senha;
        const email = req.body.email;

        UserModel.findOne({ email: email }).lean().exec(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Server error', error: err
                });
            }
            const auth_err = (senha == '' || senha == null || !user);

            if (!auth_err) {
                if (bcrypt.compareSync(senha, user.senha)) {
                    let token = jwt.sign({_id: user._id }, consts.keyJWT, { expiresIn: consts.expiseJWT });
                    delete user.senha;
                    return res.json({ ...user, token: token })
                }
            }
            return res.status(404).json({
                message: 'Wrong e-mail or password'
            })
        })
    },

    check_token: function (req, res, next) {
        const token = req.get('Authorization');

        if (!token) {
            return res.status(401).json({ message: 'Token not found' });
        }
        jwt.verify(token, consts.keyJWT,
            (err, decoded) => {
                if (err || !decoded) {
                    return res.status(401)
                        .json({ message: 'Token Errado! Erro de Autenticação' });
                }
                next();
            })
    },

    user_data: function(req, res) {
        const token = req.get('Authorization');
        jwt.verify(token, consts.keyJWT,
            (err, decoded) => {
                const id = decoded._id;
                UserModel.findById(id).lean().exec(function(err, user) {
                    if(err || !user){
                        return res.status(500).json({
                            message: 'Erro enquanto tentava conseguir o usuário', error: err})
                    }
                    let token = jwt.sign({_id: user._id }, consts.keyJWT, { expiresIn: consts.expiseJWT });
                    delete user.senha;
                    return res.json({ ...user, token: token });
                });
            });
    }
}
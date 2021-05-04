const bcrypt = require('bcryptjs');
const { request } = require('express');
const passGenerator = require('generate-password');
const { User, Schedule, sequelize } = require("../models");

const usersController = {
    login: (req, res) => {
        return res.render('login', {
            message: ""
        });
    },

    register: (req, res) => {
        return res.render("register", {
            message: ""
        });
    },

    forgetPasswordpage: (req, res) => {
        return res.render("forgotPasswordPage");
    },

    userWithSchedule: (req, res) => {
        return res.render("userSchedule");
    },

    userWithoutSchedule: (req, res) => {
        return res.render("userschedule");
    },

    create: async (req, res) => {
        try {
            const {
                name,
                cpf,
                cns,
                mother_name,
                birth_date,
                phone_number,
                gender,
                ethnicity,
                email,
                password,
                address_id,
            } = req.body;
            
            const senhaCrypt = bcrypt.hashSync(password, 10);
    
            const user = await User.create({
                name,
                cpf,
                cns,
                mother_name,
                birth_date,
                phone_number,
                gender,
                ethnicity,
                email,
                password: senhaCrypt,
                address_id,
            });
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json(error);
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.session.usuarioLogado;
            const { name, phone_number, gender, email, password } = req.body;
            
            if (!name|| !phone_number|| !email|| !password)
                return res.render({message: "Algum campo nao foi preenchido."})
                
            let user = await User.update(
                {
                    name,
                    phone_number,
                    gender,
                    email,
                    password,
                }, {
                    where: { id },
                }
            );
            return res.status(200).json(user);

        } catch(error) {
            return res.status(400).json("CPF não encontrado.");
        } 
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.destroy({
                where: { id },
            });

            if(!user) 
                return res.status(401).json("Usuario não encontrado.");

            return res.status(200).json("Deletado com sucesso.");

        } catch(error) {
            return res.status(401).json("CPF não registrado!");
        }
    },

    find: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findOne({
                where: { id },
            });
            
            return res.status(200).json(user);

        } catch(error) {
            return res.status(400).json("Usuario nao encontrado.");
        }
    },

    loginAuth: async (req, res) => {

            const {cpf, password} = req.body; 
               
            const user = await User.findOne({
                where: { cpf }
            }); 

            if(!cpf || !password)
                return res.render("login", {message: "Preencha os campos!"});

            if(!user) 
                return res.render("login", {message: "Usuario invalido!"});
            
            if (bcrypt.compareSync(password, user.password) && user.cpf === cpf) {
                req.session.usuarioLogado = user;
                return res.redirect("users/userprofile");

            } else
                return res.render("users", {message: "Senha incorreta"});

    },

    LoadUserPage: async (req, res) => {
        const { id } = req.session.usuarioLogado;

        const user = await User.findOne({
            where: {id}
        });

        if(!user)
            return res.render("login", {message: "Usuario invalido!"});

        const schedule = await Schedule.findOne({
            where: {user_id: user.id} 
        });
        
        // sem agendamento -> userSchedule
        // com agendamento -> constultSchedule
        if (schedule)
            return res.redirect("/users/userWithSchedule");

        else 
            return res.redirect("/users/userWithSchedule");
    },

    forgotPassword: async (req, res) => {

        const {email, cpf} = req.body; 
        
        const user = await User.findOne({
            where: { cpf, email },
        });
        
        if(!user) 
            return res.status(401).json({error: "Usuario invalido!" });

        else {
            const newPassword = passGenerator.generate({
                length:10,
                uppercase:true
            });

            const encryptNewPassword = bcrypt.hashSync(newPassword, 10);

            await User.update({
                    password: encryptNewPassword
                }, {
                    where: { id: user.id },
                }
            );

            if(user.email === email && cpf === user.cpf) 
                return res.status(200).json({message: `Your new password is ${newPassword}`});
            else 
                return res.status(401).json({error: "Usuario inexistente!" });
        }

    }
};

module.exports = usersController;

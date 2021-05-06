const bcrypt = require('bcryptjs');
const { request } = require('express');
const passGenerator = require('generate-password');
const moment = require("moment");
const { User, Schedule, AvailableHour, Address, sequelize } = require("../models");

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

    updateUserProfilePage: async (req, res) => {
        let { 
            name, 
            cpf, 
            cns, 
            address_id, 
            mother_name, 
            birth_date, 
            phone_number, 
            gender, 
            ethnicity,
            email,
            password,   
        } = req.session.usuarioLogado;

        const newBirth = moment(birth_date).format("DD/MM/YYYY");

        let {
            address, 
            number, 
            complement, 
            zip_code, 
            neighborhood, 
            city
            } = await Address.findOne({
                where: {id: address_id}
        });

        return res.render("changeprofile", {
            message: "",
            name,
            cpf, 
            cns, 
            address_id, 
            mother_name, 
            birth_date: newBirth, 
            phone_number, 
            gender, 
            ethnicity,
            email,
            password,
            address, 
            number, 
            complement, 
            zip_code, 
            neighborhood, 
            city
        });
    },

    forgetPasswordpage: (req, res) => {
        return res.render('passwordrecovery', {
            message: ""
        });
    },

    userWithSchedule: async (req, res) => {
        const user_id = req.session.usuarioLogado.id;
        
        const data = params => {
            return moment(params).locale("pt-br").format("L");
        }
        const semana = params => {
            return moment(params).locale("pt-br").format("dddd").toUpperCase();
        }
        const schedule = await Schedule.findOne({
            where: {user_id}
        });
        const avahour = await AvailableHour.findOne({
            where: {id: schedule.date_hour_id}
        });
        return res.render("consultschedule", {
            avahour,
            data,
            semana
        });
    },

    userWithoutSchedule: (req, res) => {
        return res.render("userschedule");
    },

    create: async(req, res) => {
        // try {
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
                address,
                number,
                complement,
                zip_code,
                neighborhood,
                city,
                state,
            } = req.body;

            let street_number = parseInt(number);
            //const newBirth = moment(birth_date).utc().format("YYYY-MM-DD");

            const newAddress = await Address.create({
                address,
                number:street_number,
                complement,
                zip_code,
                neighborhood,
                city,
                state,
            });

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
                address_id: newAddress.id,
            });

            return res.render("userschedule"), {user: user};

        // } catch (error) {
        //     return res.render("register", {
        //         message: "Ocorreu um Erro!"
        //     });
        // }
    },

    update: async(req, res) => {
        // try {
            const { id } = req.session.usuarioLogado;
            const { phone_number, email, password } = req.body;

            if (!password) {
                await User.update({
                    phone_number,
                    email,
                }, {
                    where: { id },
                });                
            } else {
                const encryptNewPassword = bcrypt.hashSync(password, 10);
                await User.update({
                    phone_number,
                    email,
                    password: encryptNewPassword
                }, {
                    where: { id },
                });  
            }

            return res.redirect("/users/userprofile");
    },

    delete: async(req, res) => {
        // try {
            const { id } = req.session.usuarioLogado;
            const schedule = await Schedule.findOne({
                where: {user_id: id}
            });
            await AvailableHour.update({
                available: true
            }, {
                where: {id: schedule.date_hour_id}
            });
            await Schedule.destroy({
                where: { user_id: id }
            });
            res.redirect("/users/userprofile");
    },

    find: async(req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findOne({
                where: { id },
            });

            return res.status(200).json(user);

        } catch (error) {
            return res.status(400).json("Usuario nao encontrado.");
        }
    },

    loginAuth: async(req, res) => {

        const { cpf, password } = req.body;

        const user = await User.findOne({
            where: { cpf }
        });

        if (!cpf || !password)
            return res.render("login", { message: "Preencha os campos!" });

        if (!user)
            return res.render("login", { message: "Usuario invalido!" });

        if (bcrypt.compareSync(password, user.password) && user.cpf === cpf) {
            req.session.usuarioLogado = user;
            return res.redirect("/users/userprofile");

        } else
            return res.render("login", {
                message: "Senha incorreta!"
            });

    },

    LoadUserPage: async(req, res) => {
        const { id } = req.session.usuarioLogado;

        const user = await User.findOne({
            where: { id }
        });

        if (!user)
            return res.render("login", { message: "Usuario invalido!" });

        const schedule = await Schedule.findOne({
            where: { user_id: user.id }
        });

        // sem agendamento -> userSchedule
        // com agendamento -> constultSchedule
        if (schedule)
            return res.redirect("/users/userWithSchedule");

        else
            return res.redirect("/users/userWithoutSchedule");
    },

    forgotPassword: async(req, res) => {
        const { email, cpf } = req.body;
        if (!email || !cpf) {
            return res.render("passwordrecovery", {
                message: "Preencha todos os campos!"
            });
        }
        const user = await User.findOne({
            where: { cpf }
        });

        if (!user)
            return res.render("passwordrecovery", { message: "Usuario invalido!" });

        else {
            const newPassword = passGenerator.generate({
                length: 10,
                uppercase: true
            });

            const encryptNewPassword = bcrypt.hashSync(newPassword, 10);

            await User.update({
                password: encryptNewPassword
            }, {
                where: { id: user.id },
            });

            if (cpf == user.cpf) 
                return res.render("login", { message: `Sua nova senha é: ${newPassword}`});

             else
                return res.render("passwordrecovery", { message: "Usuario inexistente!" });
        }
    },

    logout: (req, res) => {
        return req.session.destroy((error) => {
            res.redirect("/");
        });
    }
};

module.exports = usersController;
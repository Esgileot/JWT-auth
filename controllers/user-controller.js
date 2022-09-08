const UserService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');

class RouterController {
    async registration (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Invalid value", errors.array()));
            }
            const {email, password} = req.body;
            const userData = await UserService.registration(email, password)
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 60 * 60 * 24 * 60 * 1000, httpOnly: true});
            return res.json(userData);
            
        } catch (e) {
            next(e);          
        }
    }
    async login (req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await UserService.login(email, password);
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 60 * 60 * 24 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async logOut (req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await UserService.logOut(refreshToken);
            res.clearCookie("refreshToken");
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }
    async activate (req, res, next) {
        try {
            const activationLink = req.params.link;
            await UserService.activate(activationLink)
            res.redirect("http://google.com")
        } catch (e) {
            next(e);
        }
    }
    async refresh (req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken);
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 60 * 60 * 24 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async getAllUsers (req, res, next) {
        try {
            const users = await UserService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new RouterController();
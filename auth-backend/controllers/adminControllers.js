import Admin from '../models/adminModel.js';
import securePassword from '../utils/securePassword.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import bcrypt from 'bcrypt';
import JwtService from '../utils/JwtService.js';
import Messages from '../utils/constants.js';

const registerAdmin = async (req, res, next) => {
    const { user_name, email, phone_number, password } = req.body;

    const existingEmail = await Admin.exists({ email });
    if (existingEmail) {
        return next(new ErrorHandler(Messages.EMAIL_ALREADY_EXISTS, 400));
    }

    const existingNumber = await Admin.exists({ phone_number });
    if (existingNumber) {
        return next(new ErrorHandler(Messages.PHONE_ALREADY_EXISTS, 400));
    }

    const existingName = await Admin.exists({ user_name });
    if (existingName) {
        return next(new ErrorHandler(Messages.USERNAME_ALREADY_EXISTS, 400));
    }

    const spassword = await securePassword(password);

    try {
        const admin = await Admin.create({
            user_name,
            email,
            phone_number,
            password: spassword,
            is_verified: true,
        });

        res.status(200).json({
            success: true,
            message: Messages.REGISTER_SUCCESS,
            admin: {
                id: admin._id,
                user_name: admin.user_name,
                email: admin.email,
                phone_number: admin.phone_number,
            }
        });
    } catch (error) {
        return next(error);
    }
};

export const loginAdmin = async (req, res, next) => {
    const { emailOrMobile, password } = req.body;

    if (!emailOrMobile || !password) {
        return next(new ErrorHandler(Messages.FILL_CREDENTIALS, 400));
    }

    const admin = await Admin.findOne({
        $or: [
            { email: emailOrMobile },
            { phone_number: emailOrMobile }
        ]
    }).select("+password");

    if (!admin) {
        return next(new ErrorHandler(Messages.INVALID_LOGIN, 401));
    }

    const isPasswordMatched = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler(Messages.INVALID_LOGIN, 401));
    }

    const access_token = JwtService.sign({ _id: admin._id, role: admin.role });


    res.cookie("JWToken", { access_token }, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: Messages.LOGIN_SUCCESS,
        access_token,
        admin: {
            id: admin._id,
            user_name: admin.user_name,
            email: admin.email,
            phone_number: admin.phone_number,
        }
    });
};




export const signout = async (req, res, next) => {
    try {
        await RefreshToken.deleteOne({ token: req.body.refresh_token });
    } catch (error) {
        return next(new ErrorHandler(Messages.DATABASE_ERROR, 500));
    }

    res.clearCookie("JWToken");
    res.status(200).json({
        message: Messages.SIGNOUT_SUCCESS
    });
};

export const getMyProfile = async (req, res, next) => {
    try {
        const token = req.cookies.JWToken?.access_token || req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return next(new ErrorHandler(Messages.UNAUTHORIZED_ACCESS, 401));
        }

        const decoded = JwtService.verify(token);

        if (!decoded._id) {
            return next(new ErrorHandler(Messages.UNAUTHORIZED_ACCESS, 401));
        }

        const admin = await Admin.findById(decoded._id);

        if (!admin) {
            return next(new ErrorHandler(Messages.ADMIN_NOT_FOUND, 404));
        }

        res.status(200).json({
            success: true,
            admin: {
                id: admin._id,
                user_name: admin.user_name,
                email: admin.email,
                phone_number: admin.phone_number,
            }
        });
    } catch (error) {
        console.error("Error in getMyProfile:", error);
        return next(new ErrorHandler(error.message || "Internal Server Error", 500));
    }
};



export default registerAdmin;

import { useEffect, useState } from 'react';
import { useNavigate } from '@remix-run/react';
import API from '~/utils/api';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function Profile() {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('access_token'); // ✅ Remove token from cookies
        toast.success('Signout successful! 🎉');
        navigate('/signin'); // go back to signin page
    };

    const fetchProfile = async () => {
        try {
            const res = await API.get('/profile');
            setUser(res.data.admin); // according to your api, it's inside 'admin'
        } catch (err) {
            toast.error('Please login first!');
            navigate('/signin');
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const profileFields = user
        ? [
            { label: "Name", value: user.user_name },
            { label: "Email", value: user.email },
            { label: "Phone", value: user.phone_number },
        ]
        : [];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="backdrop-blur-md bg-white/20 border border-white/30 shadow-2xl rounded-3xl max-w-md w-full p-8"
            >
                <h2 className="text-3xl font-extrabold text-white text-center mb-8">
                    👤 Your Profile
                </h2>
                {user ? (
                    <div className="space-y-6 text-white/90 text-center">
                        {profileFields.map((field) => (
                            <div key={field.label}>
                                <p className="text-sm font-semibold uppercase text-white/60">{field.label}</p>
                                <p className="text-xl font-bold">{field.value}</p>
                            </div>
                        ))}

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleLogout}
                            className="mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all"
                        >
                            Sign Out
                        </motion.button>
                    </div>
                ) : (
                    <p className="text-center text-white/80 animate-pulse">Loading your profile...</p>
                )}
            </motion.div>
        </div>
    );
}

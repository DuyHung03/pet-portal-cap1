import { motion } from 'framer-motion';
import { Loader, Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import PasswordStrengthMeter from '../../component/PasswordStrengthMeter/PasswordStrengthMeter';
import Input from '../../component/Input/Input';
import withBackground from '../../Hoc/FloatingShape';
import { toast } from 'react-toastify';

const SignUpPage = () => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { signup, error, isLoading } = useAuthStore();

    const validateForm = () => {
        const usernameRegex = /^[a-zA-Z0-9_.]{3,30}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;

        if (!username || !usernameRegex.test(username)) {
            toast.error(
                'Username must be 3-30 characters long and can only contain letters, numbers, underscores, or dots.',
            );
            return false;
        }
        if (!email || !emailRegex.test(email)) {
            toast.error('Please enter a valid email address.');
            return false;
        }
        if (!password || !passwordRegex.test(password)) {
            toast.error(
                'Password must be 8-64 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.',
            );
            return false;
        }
        return true;
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await signup(username, email, password);
            toast.success('SignUp Successfully');
            navigate('/verify-email');
        } catch (error) {
            console.log(error);
            toast.error('SignUp error');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
            overflow-hidden"
        >
            <div className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-emerald-500 text-transparent bg-clip-text">
                    Create Account
                </h2>

                <form onSubmit={handleSignUp}>
                    <Input
                        icon={User}
                        type="text"
                        placeholder="Full Name"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <Input
                        icon={Mail}
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        icon={Lock}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <p className="text-red-500 font-semibold mt-2">
                            {error}
                        </p>
                    )}
                    <PasswordStrengthMeter password={password} />

                    <motion.button
                        className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-emerald-600 text-white 
                        font-bold rounded-lg shadow-lg hover:from-blue-600
                        hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                         focus:ring-offset-gray-900 transition duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader
                                className=" animate-spin mx-auto"
                                size={24}
                            />
                        ) : (
                            'Sign Up'
                        )}
                    </motion.button>
                </form>
            </div>
            <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
                <p className="text-sm text-gray-400">
                    Already have an account?{' '}
                    <Link
                        to={'/login'}
                        className="text-blue-400 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </motion.div>
    );
};

export default withBackground(SignUpPage);

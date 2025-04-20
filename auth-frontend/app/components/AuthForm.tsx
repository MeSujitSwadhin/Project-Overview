import { motion } from 'framer-motion';

interface Field {
    name: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface AuthFormProps {
    title: string;
    buttonText: string;
    fields: Field[];
    onSubmit: (e: React.FormEvent) => void;
    bgColor: string; // Tailwind classes
    linkText: string;
    linkHref: string;
}

export default function AuthForm({
    title,
    buttonText,
    fields,
    onSubmit,
    bgColor,
    linkText,
    linkHref,
}: AuthFormProps) {
    return (
        <div className={`min-h-screen flex items-center justify-center ${bgColor}`}>
            <form
                action=''
                method='post'
                onSubmit={onSubmit}
                className="bg-white/70 backdrop-blur-md p-10 rounded-3xl shadow-xl w-full max-w-sm space-y-6"
            >
                <h2 className="text-3xl font-extrabold text-center text-gray-800">{title}</h2>

                <div className="space-y-4">
                    {fields.map((field) => (
                        <input
                            key={field.name}
                            name={field.name}
                            type={field.type}
                            placeholder={field.placeholder}
                            value={field.value}
                            onChange={field.onChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent placeholder-gray-400 text-gray-700"
                            required
                        />
                    ))}
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all"
                >
                    {buttonText}
                </motion.button>

                <p className="text-sm text-center text-gray-600">
                    {linkText}{" "}
                    <a href={linkHref} className="text-blue-500 font-medium hover:underline">
                        {linkHref === "/login" ? "Login" : "Sign up"}
                    </a>
                </p>
            </form>
        </div>
    );
}

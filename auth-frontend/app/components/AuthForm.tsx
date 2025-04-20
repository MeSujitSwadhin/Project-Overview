import { Form } from "@remix-run/react";

interface Field {
    name: string;
    type: string;
    placeholder: string;
}

interface AuthFormProps {
    heading: string;
    fields: Field[];
    submitButtonText: string;
    error?: Record<string, string>;
    bottomText: string;
    bottomLinkText: string;
    bottomLinkHref: string;
    themeColor?: "green" | "blue";
}

export default function AuthForm({
    heading,
    fields,
    submitButtonText,
    error,
    bottomText,
    bottomLinkText,
    bottomLinkHref,
    themeColor = "blue",
}: AuthFormProps) {
    const bgGradient =
        themeColor === "green"
            ? "bg-gradient-to-r from-green-100 via-white to-green-100"
            : "bg-gradient-to-r from-blue-100 via-white to-blue-100";

    const buttonBg =
        themeColor === "green" ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600";

    const textColor =
        themeColor === "green" ? "text-green-700" : "text-gray-800";

    const linkColor =
        themeColor === "green" ? "text-green-500" : "text-blue-500";

    return (
        <div className={`min-h-screen flex items-center justify-center ${bgGradient}`}>
            <Form
                method="post"
                className="bg-white/70 backdrop-blur-md p-10 rounded-3xl shadow-xl w-full max-w-sm space-y-6"
            >
                <h2 className={`text-3xl font-extrabold text-center ${textColor}`}>{heading}</h2>

                <div className="space-y-4">
                    {fields.map((field) => (
                        <div key={field.name} className="flex flex-col space-y-1">
                            <input
                                name={field.name}
                                type={field.type}
                                placeholder={field.placeholder}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-transparent shadow focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder-gray-400 text-gray-800"

                                required
                            />
                            {error?.[field.name] && (
                                <p className="text-sm text-red-600">{error[field.name]}</p>
                            )}
                        </div>
                    ))}
                </div>

                {error?.general && (
                    <div className="text-sm text-red-600 text-center">
                        {error.general}
                    </div>
                )}

                <button
                    type="submit"
                    className={`w-full mt-6 ${buttonBg} text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all disabled:opacity-50`}
                >
                    {submitButtonText}
                </button>

                <p className="text-sm text-center text-gray-600">
                    {bottomText}{" "}
                    <a href={bottomLinkHref} className={`${linkColor} font-medium hover:underline`}>
                        {bottomLinkText}
                    </a>
                </p>
            </Form>
        </div>
    );
}

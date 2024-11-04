"use client";

const Footer: React.FC = () => {
    return (
        <footer className="text-center p-4 bg-gray-200 fixed left-0 bottom-0 w-full">
            <p>&copy; {new Date().getFullYear()} Devis by Anatholy. All rights reserved.</p>
        </footer>
    );
};

export default Footer;

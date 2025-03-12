import { Youtube, Github, Copyright } from "lucide-react";
import logo from "/hyrly_nobg.png";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
    return (
        <footer className="border px-6 py-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div>
                <Link to="/">
                    <img src={logo} className="w-20 sm:w-24 mx-auto md:mx-0" alt="Logo" />
                </Link>

                <p className="flex gap-2 justify-center md:justify-start items-center text-sm text-gray-400 mt-2">
                    Copyright <Copyright size={13} /> 2025 Jems Labs
                </p>
                <p className="text-sm text-gray-400 my-2">All rights reserved</p>
            </div>

            <div className="mt-4 md:mt-0 flex space-x-4">
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition">
                    <Youtube size={24} />
                </a>
                <a href="https://x.com/ijemslabs" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition text-xl">
                    <FaXTwitter />
                </a>
                <a href="https://github.com/Jems-Labs/hyrly" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition">
                    <Github size={24} />
                </a>
            </div>
        </footer>
    );
}

export default Footer;

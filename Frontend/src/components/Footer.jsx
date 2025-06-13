import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-6">
            <div className="container mx-auto flex justify-between items-center">
                {/* Left side content */}
                <div>
                    <h2 className="text-xl font-bold">Job Hunt</h2>
                    <p className="text-sm text-gray-400 mt-2">
                        © 2024 Your Company. All rights reserved.
                    </p>
                </div>

                {/* Right side content */}
                <div className="flex gap-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <FaFacebook className="text-xl hover:text-blue-500" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <FaTwitter className="text-xl hover:text-blue-400" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <FaLinkedin className="text-xl hover:text-blue-600" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <section id="contact" className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Get In <span className="text-cyan-400">Touch</span></h2>
                        <p className="text-gray-400">Have a project in mind? Let's work together.</p>
                    </div>

                    <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-2xl">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg focus:outline-none focus:border-cyan-500 text-white transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg focus:outline-none focus:border-cyan-500 text-white transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg focus:outline-none focus:border-cyan-500 text-white transition-colors"
                                    placeholder="Project Proposal"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                <textarea
                                    rows="4"
                                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg focus:outline-none focus:border-cyan-500 text-white transition-colors"
                                    placeholder="Your message here..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-bold text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-1 block text-center"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;

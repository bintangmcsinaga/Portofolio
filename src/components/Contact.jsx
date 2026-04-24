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
                        <div className="mb-5 flex justify-center">
                            <span className="section-kicker">Contact</span>
                        </div>
                        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Let&apos;s build something focused, useful, and technically solid.</h2>
                        <p className="text-[#D7C7EE]">Have a project in mind? Let's work together.</p>
                    </div>

                    <div className="rounded-[30px] border border-white/10 bg-[#24124f]/82 p-8 shadow-[0_28px_70px_rgba(10,6,26,0.4)] backdrop-blur-sm">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#FFB39F]">Name</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-xl border border-white/10 bg-[#1E104E] px-4 py-3 text-white transition-colors placeholder:text-[#A996C7] focus:border-[#FF653F] focus:outline-none"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#FFB39F]">Email</label>
                                    <input
                                        type="email"
                                        className="w-full rounded-xl border border-white/10 bg-[#1E104E] px-4 py-3 text-white transition-colors placeholder:text-[#A996C7] focus:border-[#FF653F] focus:outline-none"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#FFB39F]">Subject</label>
                                <input
                                    type="text"
                                    className="w-full rounded-xl border border-white/10 bg-[#1E104E] px-4 py-3 text-white transition-colors placeholder:text-[#A996C7] focus:border-[#FF653F] focus:outline-none"
                                    placeholder="Project Proposal"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#FFB39F]">Message</label>
                                <textarea
                                    rows="4"
                                    className="w-full rounded-xl border border-white/10 bg-[#1E104E] px-4 py-3 text-white transition-colors placeholder:text-[#A996C7] focus:border-[#FF653F] focus:outline-none"
                                    placeholder="Your message here..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="block w-full rounded-xl bg-[#FF653F] py-4 text-center font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#ff7a59] hover:shadow-[0_18px_40px_rgba(255,101,63,0.28)]"
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

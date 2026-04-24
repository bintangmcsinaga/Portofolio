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
                        <p className="text-[#888888]">Have a project in mind? Let's work together.</p>
                    </div>

                    <div className="rounded-2xl border border-white/[0.06] bg-[#141414] p-8">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#FF653F]">Name</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-xl border border-white/[0.06] bg-[#0d0d0d] px-4 py-3 text-white transition-colors placeholder:text-[#555555] focus:border-[#FF653F] focus:outline-none"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#FF653F]">Email</label>
                                    <input
                                        type="email"
                                        className="w-full rounded-xl border border-white/[0.06] bg-[#0d0d0d] px-4 py-3 text-white transition-colors placeholder:text-[#555555] focus:border-[#FF653F] focus:outline-none"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#FF653F]">Subject</label>
                                <input
                                    type="text"
                                    className="w-full rounded-xl border border-white/[0.06] bg-[#0d0d0d] px-4 py-3 text-white transition-colors placeholder:text-[#555555] focus:border-[#FF653F] focus:outline-none"
                                    placeholder="Project Proposal"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#FF653F]">Message</label>
                                <textarea
                                    rows="4"
                                    className="w-full rounded-xl border border-white/[0.06] bg-[#0d0d0d] px-4 py-3 text-white transition-colors placeholder:text-[#555555] focus:border-[#FF653F] focus:outline-none"
                                    placeholder="Your message here..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="block w-full rounded-xl bg-[#FF653F] py-4 text-center font-bold text-white transition-all duration-300 hover:brightness-110"
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

import contact from '../json/contact.json';
const ContactUs = () => {
    return (
        <div id="contact" className='py-12 flex items-center justify-center flex-col'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7932.741866032694!2d106.668581!3d-6.214715!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f9912c7f297b%3A0xe5a3a671dae861ab!2sKopi%20kuy!5e0!3m2!1sid!2sid!4v1680617229460!5m2!1sid!2sid"
                width="96%"
                height="400"
                className='border-none'
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>

            <div className='w-full flex justify-around items-center px-8 pt-12'>
                {contact.map((data) => (
                    <div key={data.title} className='flex flex-col justify-center items-center gap-4'>
                        <img
                            src={data.img}
                            width={"100%"}
                            className='w-12'
                        />
                        <span className='text-xl text-black'>{data.path}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactUs;
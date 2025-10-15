import ScrollAnimation from 'react-animate-on-scroll';
import team from '../json/team.json';

const OurTeam = () => {
    return (
        <div id="team" className="w-full min-h-screen flex flex-col justify-center items-center p-8 bg-[#EEE6DC] shadow-inner">
            <ScrollAnimation animateIn='fadeInDown' animateOut='fadeOutUp'>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-3xl text-black font-bold'>Our Team</h1>
                    <p className='text-lg text-black'>
                        Kami berinvestasi dalam rasa - mulai dari pemilihan biji, metode pemanggangan, hingga barista dengan sertifikat internasional.
                    </p>
                </div>
            </ScrollAnimation>

            <div className='w-full flex items-center justify-between gap-4 mt-16'>
                {team.map((data, index) => (
                    <ScrollAnimation key={index} animateIn={"fadeInUp"} animateOut={"fadeOutUp"} delay={500 * index}>
                        <div className='flex flex-col items-center justify-center gap-4'>
                            <img
                                src={data.img}
                                width={"100%"}
                                className='w-72 rounded-xl hover:scale-110 transition-transform duration-300 ease-in-out shadow-xl'
                            />

                            <span className='text-xl text-black font-bold'>{data.name}</span>
                            <span className='text-md text-black'>{data.role}</span>
                        </div>
                    </ScrollAnimation>
                ))}
            </div>
        </div>
    );
};

export default OurTeam;
import ScrollAnimation from 'react-animate-on-scroll';
import review from '../json/review.json';

const Review = () => {
    return (
        <div id="review" className="relative w-full min-h-screen flex flex-col justify-center items-center p-8 bg-white">
            <img
                src='https://res.cloudinary.com/dbzdxsmvy/image/upload/v1726082632/Kopi-Kuy-Assets/bg-review.svg'
                width={"100%"}
                className='absolute top-0 left-0 w-full h-full'
            />

            <div className='flex flex-col justify-center items-center z-10'>
                <ScrollAnimation animateIn='fadeInDown' animateOut='fadeOutUp' className='text-center'>
                    <h1 className='text-3xl text-black font-bold'>Apa Kata Mereka</h1>
                    <p className='text-lg text-black'>
                        Kami berikan fakta dan data, karena kepuasan konsumen selalu nomor 1 untuk kami.
                    </p>
                </ScrollAnimation>

                <div className='w-full flex flex-wrap justify-between mt-16'>
                    {review.map((data, index) => (
                        <ScrollAnimation key={index} animateIn='fadeInUp' animateOut='fadeOutUp' delay={500 * index} className='w-[24%] flex flex-col gap-2 p-6 bg-white shadow-xl rounded-xl'>
                            <div className='flex gap-2 items-start'>
                                <img
                                    src={data.img}
                                    width={"100%"}
                                    className='w-24 rounded-lg hover:scale-110 transition-transform duration-300 ease-in-out'
                                />

                                <div className='flex flex-col text-black'>
                                    <span className='text-xl font-bold'>{data.name}</span>
                                    <span>{data.role}</span>
                                </div>
                            </div>

                            <div className='mt-4'>
                                <p className='text-black text-center'>"{data.content}"</p>
                            </div>
                        </ScrollAnimation>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Review;
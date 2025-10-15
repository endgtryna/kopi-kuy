import ScrollAnimation from "react-animate-on-scroll";

const AboutUs = () => {
    return (
        <div id="about" className='w-full min-h-screen flex flex-col justify-center items-center gap-4 text-center p-8'>
            <h1 className="text-3xl text-black font-bold">Gak Ngopi Gak Kuy !</h1>
            <p className="text-lg text-black">
                Didirikan pada 2017, Kopi Kuy merupakan sebuah startup kopi retail yang ingin menyajikan kopi dengan kualitas tinggi untuk para pelanggannya. Nama Kuy yang diambil dari "yuk" yang merupakan harapan kami untuk mengajak semua yang terlibat dalam bisnis kami untuk bersama-sama menikmati sajian kopi yang berkualitas.
            </p>

            <ScrollAnimation animateIn="zoomIn" animateOut="zoomOut" className="flex justify-center items-center">
                <img
                    src='https://res.cloudinary.com/dbzdxsmvy/image/upload/v1726080172/Kopi-Kuy-Assets/about-img.png'
                    width={"100%"}
                    className='w-5/12 rounded-xl transition-transform duration-300 ease-in-out'
                />
            </ScrollAnimation>

            <p className="text-lg text-black">
                Kopi yang kami jual, hanya dari petani terpilih, dan berkualitas tinggi diproses secara sempurna dan diteruskan oleh para barista handal, yang penuh semangat dalam menyiapkan segelas kebahagiaan spesial untuk anda.
            </p>
        </div>
    );
};

export default AboutUs;
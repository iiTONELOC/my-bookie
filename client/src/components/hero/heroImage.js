import heroImage from '../../assets/images/landing.png';
export default function HeroImage() {
    return (
        <img alt='hero' className='w-full h-full object-contain' src={heroImage} />
    )
}
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';
import { useRef } from 'react';
import { useMediaQuery } from 'react-responsive';

const Hero = () => {
  
  const videoRef = useRef();

  const isMobile = useMediaQuery({maxWidth: 767})

  useGSAP(() => {
    const heroSplit = new SplitText('.title', {type: 'chars, words'});

    const paragraphSplit = new SplitText('.subtitle', {type: 'lines'});

    heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));

    gsap.from(heroSplit.chars, {
        yPercent: 100,
        stagger: 0.05,
        duration: 1.8,
        ease: 'expo.out'
    })

    gsap.from(paragraphSplit.lines, {
      yPercent: 100,
      opacity: 0,
      stagger: 0.1,
      duration: 1.8,
      ease: 'expo.out',
      delay: 1,
    })

    gsap.timeline({
       scrollTrigger:{
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
       } 
    })
    .from('.left-leaf', {
      xPercent: -100,
      opacity: 0,
      duration: 1.5,
      ease: 'power2.out',
    })
    .to('.left-leaf', {y: 200}, 0)
    .to('.right-leaf',{y: -200}, 0)

    const startValue = isMobile? 'top 50%': 'center 60%';
    const endValue = isMobile? '120% top': 'bottom top';

    let tl = gsap.timeline({
	 scrollTrigger: {
		trigger: "video",
		start: startValue,
		end: endValue,
		scrub: true,
		pin: true,
	 },
	});
	
	videoRef.current.onloadedmetadata = () => {
	 tl.to(videoRef.current, {
		currentTime: videoRef.current.duration,
	 });
	};
  }, [])

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">Mojito</h1>

        <img
          src="/images/hero-left-leaf.png"
          alt="left-leaf"
          className="left-leaf"
        />
        <img
          src="/images/hero-right-leaf.png"
          alt="right-leaf"
          className="right-leaf"
        />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail we serve is a reflection of our obsession with
                detail — from the first muddle to the final garnish. That care
                is what turns a simple drink into something truly memorable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="video absolute inset-0">
        <video ref={videoRef} src="/videos/output.mp4" muted playsInline preload='auto'></video>
      </div>
    </>
  );
};

export default Hero;

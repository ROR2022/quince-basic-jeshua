// 👨‍👩‍👧‍👦 ParentsSection - Sección de información de padres

import React, {useState, useEffect, useRef, useCallback} from "react";
//import Image from "next/image";
import { quinceMainData } from "@/components/sections/data/main-data";

export default function MadrinasSection() {
  //const { parents } = weddingData;
  const { parents, godparents, abuelos, madrinas } = quinceMainData.event;
  const sectionRef = useRef(null);
  const { maternos, paternos } = abuelos;
  const { madrina1, madrina2 } = madrinas;
  
  // Estados para animaciones escalonadas
  const [isInView, setIsInView] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [parentsVisible, setParentsVisible] = useState(false);
  const [godparentsVisible, setGodparentsVisible] = useState(false);

  // Hook personalizado para IntersectionObserver
  const useIntersectionObserver = useCallback(() => {
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // Secuencia de animaciones escalonadas
            setTimeout(() => setMessageVisible(true), 300);
            setTimeout(() => setParentsVisible(true), 700);
            setTimeout(() => setGodparentsVisible(true), 1100);
          } else {
            // Reset cuando sale de vista
            setIsInView(false);
            setMessageVisible(false);
            setParentsVisible(false);
            setGodparentsVisible(false);
          }
        },
        {
          threshold: 0.3,
          rootMargin: '-50px 0px'
        }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => observer.disconnect();
    }, []);
  }, []);

  useEffect(() => {
      if (isInView) {
        if(!messageVisible) {
          setTimeout(() => setMessageVisible(true), 100);
        }
        if(!parentsVisible) {
          setTimeout(() => setParentsVisible(true), 100);
        }
        if(!godparentsVisible) {
          setTimeout(() => setGodparentsVisible(true), 900);
        }
      }
    }, [isInView]);

  useIntersectionObserver();

  // Función helper para clases de animación
  const getAnimationClass = (isVisible, animationType, delay = '') => {
    const baseClass = 'animate-on-scroll';
    const animClass = isVisible ? `animate-${animationType} ${delay}` : '';
    return `${baseClass} ${animClass}`.trim();
  };
  
  const basicClass="font-main-text text-5xl text-blue-700 mb-4";
  const completeClass="font-main-text text-5xl text-blue-700 mb-4 scale-up-center";
  

  return (
    <section 
      ref={sectionRef}
      id="parents" 
      style={{
        height:'100vh'
      }}
      className={`py-20 bg-muted/30 relative ${isInView ? 'bg-parallax' : ''}`}
    >
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src={madrinas.backgroundVideo} type="video/mp4" />
      </video>

      
      

      <div className="mx-auto px-4 h-full flex items-center justify-center" style={{ position: 'relative', zIndex: 3 }}>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            
            <div className="relative p-6 rounded-2xl z-10 text-center space-y-8 py-12 text-white">
              
              

              <div 
              //style={{display:'none'}}
              className="space-y-8">
                
                {/* Card de Padres */}
                <div className={`${getAnimationClass(parentsVisible, 'slide-in-left', 'delay-400')} parent-card`}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300">
                    <div className="flex items-center justify-center mb-4">
                      
                      <h3 className={parentsVisible ? completeClass : basicClass}>
                        Baile del Espejo
                      </h3>
                      
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-center space-x-2">
                        
                        <p className="text-2xl font-main-text text-glow text-black">
                          {madrina1}
                        </p>
                      </div>
                      
                    </div>
                  </div>
                </div>

                {/* Card de Padrinos */}
                <div className={`${getAnimationClass(godparentsVisible, 'slide-in-right', 'delay-600')} parent-card`}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300">
                    <div className="flex items-center justify-center mb-4">
                      
                      <h3 className={godparentsVisible ? completeClass : basicClass}>
                        Ultimo Juguete
                      </h3>
                      
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-center space-x-2">
                        
                        <p className="text-2xl font-main-text text-glow text-black">
                          {madrina2}
                        </p>
                      </div>
                      
                      
                    </div>
                  </div>
                </div>
                
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

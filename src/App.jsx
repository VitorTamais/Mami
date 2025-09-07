import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import styled from 'styled-components'
import { Heart, Calendar, MapPin, Music, Camera, Star } from 'lucide-react'
import './App.css'

const theme = {
  primary: '#2c2c2c',
  secondary: '#f8f8f8',
  accent: '#f17ea1',
  text: '#333333',
  textLight: '#666666',
  white: '#ffffff',
  shadow: 'rgba(0,0,0,0.1)'
}

const timelineData = [
  {
    date: "07/09/2023",
    title: "O Primeiro Olhar",
    subtitle: "Onde tudo começou",
    content: "Naquele momento, sem saber, nossos olhares se cruzaram e mudaram tudo. Foi o início da história mais bonita que eu já vivi.",
    image: "/images/primeiro-olhar.jpg",
    icon: <Heart size={20} />
  },
  {
    date: "31/10/2023",
    title: "Primeiro Encontro",
    subtitle: "Conversas que duraram horas",
    content: "Conversando como se nos conhecêssemos há anos. Ali eu soube: você seria especial para sempre.",
    image: "/images/primeiro-encontro.jpeg",
    icon: <Calendar size={20} />
  },
  {
    date: "08/01/2024",
    title: "A Primeira Vez que te Disse 'Eu Te Amo'",
    subtitle: "Palavras que mudaram tudo",
    content: "Nervoso, gaguejando, mas com o coração cheio. Foi a primeira vez que disse essas três palavras que significam tanto.",
    image: "/images/te-amo.jpeg",
    icon: <Heart size={20} />
  },
  {
    date: "18/02/2024",
    title: "Conciliação",
    subtitle: "Nosso primeiro aprendizado",
    content: "Naquele dia, consegui ver muito mais do que um relacionamento: vi um futuro com você, repleto da felicidade de aprender e de resolver juntos.",
    image: "/images/mais.jpeg",
    icon: <Star size={20} />
  },
  {
    date: "01/06/2024",
    title: "Quer namorar comigo?",
    subtitle: "O dia que mudou nossas vidas",
    content: "A nossa data, a nossa história. O instante em que dois corações se encontraram e transformaram um simples dia em eternidade, marcando o começo do nosso amor.",
    image: "/images/namora-comigo.jpeg",
    icon: <Heart size={20} />
  },
  {
    date: "31/12/2024",
    title: "Nosso Primeiro Final de ano",
    subtitle: "Aproveitando o incrivel juntos",
    content: "Praia, sol, conversas até tarde... Descobri que viajar contigo é descobrir novos pedacinhos de felicidade a cada momento.",
    image: "/images/finaldeano.jpeg",
    icon: <MapPin size={20} />
  },
  {
    date: "26/03/2025",
    title: "Formatura da princesa",
    subtitle: "Um sonho realizado",
    content: "Aquele dia ficará para sempre na memória. Ver você de beca, foi como contemplar a realização de um sonho. A cada passo no palco, eu via sua força, sua dedicação e a mulher incrível que você se tornou. Senti um orgulho imenso e a certeza de que esse foi apenas o começo de muitas conquistas que ainda virão.",
    image: "/images/formatura.jpeg",
    icon: <Music size={20} />
  },
  {
    date: "01/06/2025",
    title: "Nosso primeiro ano de namoro juntos.",
    subtitle: "Primeiro ano de muitos...",
    content: "No nosso primeiro ano de namoro, percebi tudo o que me fez te amar até hoje: sua risada, seu companheirismo, sua força, seu carinho, seu amor e a sua felicidade. Tanto quanto o seu sorriso, seus cabelos, seus olhinhos e cada detalhe que torna você única.",
    image: "/images/primeiroanonamoro.jpeg",
    icon: <Heart size={20} />
  },
  {
    date: "07/09/2025",
    title: "Dois Anos de Nós",
    subtitle: "Celebrando nossa jornada",
    content: "Dois anos que passaram como dois dias, mas que guardam duas vidas inteiras de momentos especiais. Obrigado por cada segundo Mami.",
    image: "/images/dois-anos.jpeg",
    icon: <Heart size={20} />
  }
]

// Galeria de fotos especiais
const galleryPhotos = [
  { src: "/images/galeria1.jpeg", caption: "Nossa primeira fotinha juntos" },
  { src: "/images/galeria3.jpeg", caption: "Lavando a louça juntos kkkk" },
  { src: "/images/galeria4.jpeg", caption: "Gato Peco amassando paozinho" },
  { src: "/images/galeria5.jpeg", caption: "Prainha com a mami" },
  { src: "/images/galeria6.jpeg", caption: "Sovetinho com a mami" },
  { src: "/images/galeria7.jpeg", caption: "O PATINHO" },
  { src: "/images/galeria8.jpeg", caption: "Festinha com a mami" }
]

// Estatísticas do relacionamento
const relationshipStats = [
  { number: "731", label: "Dias juntos" },
  { number: "3.293", label: "Eu te amo" },
  { number: "47", label: "Músicas na nossa playlist" },
  { number: "+630", label: "Fotinhas" },
  { number: "∞", label: "Momentos de felicidade" }
]

// Aprendizados e crescimento
const learningsData = [
  "Aprendemos que o amor verdadeiro cresce nos detalhes do dia a dia, nos cuidados simples e na presença constante.",
  "Descobrimos que estar com a pessoa certa torna até os momentos difíceis mais leves e superáveis.",
  "Compreendemos que construir uma relação é arte diária: requer paciência, compreensão e muito carinho.",
  "Percebemos que rir juntos é uma das formas mais puras de felicidade que existem.",
  "Entendemos que apoiar os sonhos do outro é também realizar os próprios sonhos."
]

// Planos futuros
const futurePlansData = [
  "Viajar o mundo todo e conhecer lugares que sempre sonhamos",
  "Ter uma casinha linda com muitos gatinhos",
  "Aprender a fazer doces novos juntos na prainha",
  "Ter uma família linda, onde nunca falte amor, carinho e saúde.",
  "Nos casar em um lugar lindo, onde nosso futuro será moldado e construído juntos.",
  "Continuar crescendo e melhorando juntos, sempre."
]

// Componente principal
export default function LoveStoryApp() {
  const [currentImageModal, setCurrentImageModal] = useState(null)
  const [musicStarted, setMusicStarted] = useState(false)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // Controle de música
  useEffect(() => {
    const handleClick = () => {
      if (!musicStarted) {
        const audio = document.getElementById('background-music')
        if (audio) {
          audio.volume = 0.3
          audio.play().catch(() => {})
          setMusicStarted(true)
        }
      }
    }
    document.addEventListener('click', handleClick, { once: true })
    return () => document.removeEventListener('click', handleClick)
  }, [musicStarted])

  return (
    <MainContainer ref={containerRef}>
      <audio id="background-music" loop>
        <source src="/music/nossa-musica.mp3" type="audio/mpeg" />
      </audio>

      <ProgressBar style={{ scaleX: scrollYProgress }} />

      {/* Header Principal */}
      <HeroSection>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <HeroTitle>Dois Anos Mami & Ticao</HeroTitle>
          <HeroSubtitle>07 de Setembro de 2023 — 07 de Setembro de 2025</HeroSubtitle>
          <HeroDescription>
            Uma linda história de amor, carinho e muitas memórias.
          </HeroDescription>
        </motion.div>
      </HeroSection>

      {/* Timeline Principal */}
      <Section>
        <SectionTitle>Nossa Jornada</SectionTitle>
        <Timeline>
          {timelineData.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </Timeline>
      </Section>

      {/* Estatísticas */}
      <StatsSection>
        <SectionTitle>Nossos Números</SectionTitle>
        <StatsGrid>
          {relationshipStats.map((stat, index) => (
            <StatCard
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>
      </StatsSection>

      {/* Galeria */}
      <Section>
        <SectionTitle>Momentos Capturados</SectionTitle>
        <Gallery>
          {galleryPhotos.map((photo, index) => (
            <GalleryItem
              key={index}
              onClick={() => setCurrentImageModal(photo)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GalleryImage src={photo.src} alt={photo.caption} />
              <GalleryCaption>{photo.caption}</GalleryCaption>
            </GalleryItem>
          ))}
        </Gallery>
      </Section>

      {/* Aprendizados */}
      <Section>
        <SectionTitle>O que Aprendemos Juntos</SectionTitle>
        <LearningsContainer>
          {learningsData.map((learning, index) => (
            <LearningCard
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <LearningText>{learning}</LearningText>
            </LearningCard>
          ))}
        </LearningsContainer>
      </Section>

      {/* Planos Futuros */}
      <Section>
        <SectionTitle>Nossos Sonhos para o Futuro</SectionTitle>
        <PlansContainer>
          {futurePlansData.map((plan, index) => (
            <PlanCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <PlanText>{plan}</PlanText>
            </PlanCard>
          ))}
        </PlansContainer>
      </Section>

      {/* Carta Final */}
      <FinalLetter>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <LetterTitle>Para Você, Meu Amor Mami</LetterTitle>
          <LetterContent>
            Dois anos podem parecer pouco tempo, mas para nós foram duas vidas inteiras 
            vividas lado a lado. Cada manhã ao seu lado é um novo capítulo da história 
            mais bonita que eu já ajudei a escrever.
            <br /><br />
            Obrigado por transformar dias comuns em memórias extraordinárias, por tornar 
            o simples em especial, e por me ensinar que o amor verdadeiro se constrói 
            nos pequenos gestos do dia a dia.
            <br /><br />
            Que venham mais anos, mais aventuras, mais risadas e mais histórias para 
            contarmos. Você é, e sempre será, a melhor parte dos meus dias.
            <br /><br />
            <LetterSignature>Com todo meu amor,<br />Para sempre seu momolado Ticao</LetterSignature>
          </LetterContent>
        </motion.div>
      </FinalLetter>

      {/* Modal de Imagem */}
      {currentImageModal && (
        <ImageModal onClick={() => setCurrentImageModal(null)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalImage src={currentImageModal.src} alt={currentImageModal.caption} />
            <ModalCaption>{currentImageModal.caption}</ModalCaption>
            <CloseButton onClick={() => setCurrentImageModal(null)}>✕</CloseButton>
          </ModalContent>
        </ImageModal>
      )}

      {!musicStarted && (
        <MusicPrompt
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Clique em qualquer lugar para começar nossa trilha sonora ♪
        </MusicPrompt>
      )}
    </MainContainer>
  )
}

// Componente da Timeline
const TimelineItem = ({ item, index }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <TimelineItemContainer
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      $isLeft={index % 2 === 0}
    >
      <TimelineContent $isLeft={index % 2 === 0}>
        <TimelineImage src={item.image} alt={item.title} style={{ y }} />
        <TimelineTextContent>
          <TimelineDate>
            {item.icon}
            {item.date}
          </TimelineDate>
          <TimelineTitle>{item.title}</TimelineTitle>
          <TimelineSubtitle>{item.subtitle}</TimelineSubtitle>
          <TimelineText>{item.content}</TimelineText>
        </TimelineTextContent>
      </TimelineContent>
    </TimelineItemContainer>
  )
}

// Styled Components
const MainContainer = styled.div`
  background: ${theme.white};
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
`

const ProgressBar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: ${theme.accent};
  transform-origin: 0%;
  z-index: 1000;
`

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  background: linear-gradient(135deg, ${theme.secondary} 0%, ${theme.white} 100%);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/images/casal-fundo.jpg'); /* SUBSTITUA pelo caminho da sua imagem */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(4px) brightness(0.5);
    z-index: 1;
  }
  
  > div {
    position: relative;
    z-index: 2;
  }
`

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 300;
  color: ${theme.white}; 
  margin-bottom: 1rem;
  letter-spacing: -2px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.7); 
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const HeroSubtitle = styled.h2`
  font-size: 1.5rem;
  color: ${theme.accent};
  margin-bottom: 2rem;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const HeroDescription = styled.p`
  font-size: 1.2rem;
  color: ${theme.textLight};
  max-width: 600px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 2rem;
  }
`

const Section = styled.section`
  padding: 8rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 300;
  text-align: center;
  color: ${theme.primary};
  margin-bottom: 4rem;
  letter-spacing: -1px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`

const Timeline = styled.div`
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${theme.accent};
    transform: translateX(-50%);
  }
  
  @media (max-width: 768px) {
    &::before {
      left: 2rem;
    }
  }
`

const TimelineItemContainer = styled(motion.div)`
  display: flex;
  justify-content: ${props => props.$isLeft ? 'flex-start' : 'flex-end'};
  margin-bottom: 6rem;
  
  @media (max-width: 768px) {
    justify-content: flex-start;
    margin-left: 4rem;
  }
`

const TimelineContent = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  max-width: 500px;
  flex-direction: ${props => props.$isLeft ? 'row' : 'row-reverse'};
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const TimelineImage = styled(motion.img)`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 10px 30px ${theme.shadow};
`

const TimelineTextContent = styled.div`
  flex: 1;
`

const TimelineDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.accent};
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const TimelineTitle = styled.h3`
  font-size: 1.5rem;
  color: ${theme.primary};
  margin-bottom: 0.5rem;
  font-weight: 600;
`

const TimelineSubtitle = styled.h4`
  font-size: 1rem;
  color: ${theme.textLight};
  margin-bottom: 1rem;
  font-style: italic;
`

const TimelineText = styled.p`
  color: ${theme.text};
  line-height: 1.6;
  font-size: 0.95rem;
`

const StatsSection = styled.section`
  padding: 8rem 2rem;
  background: ${theme.secondary};
  text-align: center;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;
`

const StatCard = styled(motion.div)`
  background: ${theme.white};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 20px ${theme.shadow};
`

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.accent};
  margin-bottom: 0.5rem;
`

const StatLabel = styled.div`
  color: ${theme.text};
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`

const GalleryItem = styled(motion.div)`
  cursor: pointer;
  background: ${theme.white};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 20px ${theme.shadow};
`

const GalleryImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`

const GalleryCaption = styled.div`
  padding: 1rem;
  color: ${theme.text};
  font-size: 0.9rem;
  text-align: center;
`

const LearningsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
`

const LearningCard = styled(motion.div)`
  background: ${theme.white};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 20px ${theme.shadow};
  border-left: 4px solid ${theme.accent};
`

const LearningText = styled.p`
  color: ${theme.text};
  line-height: 1.7;
  font-size: 1.1rem;
  font-style: italic;
`

const PlansContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`

const PlanCard = styled(motion.div)`
  background: ${theme.white};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 20px ${theme.shadow};
  text-align: center;
`

const PlanText = styled.p`
  color: ${theme.text};
  line-height: 1.6;
  font-size: 1rem;
`

const FinalLetter = styled.section`
  padding: 8rem 2rem;
  background: ${theme.primary};
  color: ${theme.white};
  text-align: center;
`

const LetterTitle = styled.h2`
  font-size: 3rem;
  font-weight: 300;
  margin-bottom: 3rem;
  color: ${theme.accent};
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const LetterContent = styled.p`
  font-size: 1.3rem;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`

const LetterSignature = styled.div`
  font-style: italic;
  color: ${theme.accent};
  margin-top: 2rem;
`

const ImageModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  cursor: pointer;
`

const ModalContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  cursor: default;
`

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
`

const ModalCaption = styled.div`
  color: ${theme.white};
  text-align: center;
  padding: 1rem;
  font-size: 1.1rem;
`

const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: ${theme.white};
  font-size: 2rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
`

const MusicPrompt = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: ${theme.accent};
  color: ${theme.white};
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 0.9rem;
  box-shadow: 0 5px 20px ${theme.shadow};
  z-index: 1000;
  
  @media (max-width: 768px) {
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
    text-align: center;
  }
`

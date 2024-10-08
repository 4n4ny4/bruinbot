import "/Users/ananyaanand/Desktop/bruinbot/bruinbot-client/src/App.css"
import{useState, useEffect} from "react"
import { useNavigate } from 'react-router-dom';
import {Container, Row, Col} from "react-bootstrap"
import {ArrowRightCircle} from "react-bootstrap-icons"
import headerImg from "../assets/headerImg.png"

export const Banner = () => {
    const navigate = useNavigate();
    const[loopNum, setLoopNum] = useState(0);
    const[isDeleting, setIsDeleting] = useState(false);
    const toRotate=["8 AMs.", "Friday Classes.", "Stress."];
    const[text, setText] = useState("");
    const period = 2000;
    const[delta, setDelta] = useState(300 - Math.random() * 100) // determine how fast letter comes after 

    useEffect(() => {
        let ticker = setInterval(() => {
          tick();
        }, delta);
    
        return () => { clearInterval(ticker) };
      }, [text])
    
      const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);
    
        setText(updatedText);
    
        if (isDeleting) {
          setDelta(prevDelta => prevDelta / 2);
        }
    
        if (!isDeleting && updatedText === fullText) {
          setIsDeleting(true);
          setDelta(period);
        } else if (isDeleting && updatedText === '') {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
          setDelta(500);
        } 
      }
    

    const handleClick = () => {
        navigate('/Form');
      };

    return(
        <section className="banner" id="home">
            <Container className="align-items-center">
                <Row className="banner-row">
                    <Col xs={12} md={6} xl={7}>
                    <h1>Say No to <span className="wrap">{text}</span></h1>
                    <button onClick={handleClick}>Get Started with BruinBot!<ArrowRightCircle size={30}/></button>
                    </Col>
                    <Col xs={12} md={6} xl={5} className="banner-img-container">
                    <img src={headerImg} alt="Bear"></img>
                    </Col>
                </Row>
            </Container>


        </section>
    )
}
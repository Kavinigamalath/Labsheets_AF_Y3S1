import NavBar from './pages/NavBar';
import Greeting from './pages/Greeting';
import Footer from './pages/Footer';
import Card from './pages/Card';
import Button from './pages/Button';
import Banner from './pages/Banner';
import Testimonial from './pages/Testimonial';

function App() {
  return (
    <div style={{fontFamily: "Arial, sans-serif", maxWidth: "700px", margin: "0 auto"}}>
      <NavBar />
      <Banner 
        message="Limited time offer! Get 20% off now!" 
        buttonText="Shop Now" 
        onClick={() => alert("Button clicked!")} 
      />
      <Greeting />
      <Card
        image="https://via.placeholder.com/300"
        title="Sample Product"
        description="This is a great product that solves your problem."
      />
      <div>
        <Button size="small" styleType="primary">Small Primary</Button>
        <Button size="medium" styleType="secondary">Medium Secondary</Button>
        <Button size="large" styleType="primary">Large Primary</Button>
      </div>
      <Testimonial
        quote="This service changed my life!"
        name="John Doe"
        photo="https://randomuser.me/api/portraits/men/1.jpg"
      />
      <Footer />
    </div>
  );
}
export default App;


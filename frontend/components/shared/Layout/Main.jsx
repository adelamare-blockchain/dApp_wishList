// components
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

const Main = ({ children }) => {
  return (
    <div className='app'>
      {/* NAVBAR */}
      <NavBar />

      {/* MAIN */}
      <main className='main'>{children}</main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Main;

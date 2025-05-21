"use client";
import Header from "@/components/Home/Header";
import OptionCard from "@/components/Home/OptionCard";

const Home = () => {
  return (
    <>
      <Header userName="Nombre de ejemplo..."/>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="flex gap-12">
          <h1 className="text-4xl font-bold mb-6 text-white">
            ¡Bienvenido, {"usuario"}!
          </h1>
        </div>
        <div className="flex flex-col gap-8 items-center w-[80vh] h=[100vh]">
          <div className="flex flex-row gap-8">
            <OptionCard color="red" title="¿Cómo te sientes hoy?" to="/Chat" />
            <OptionCard color="yellow" title="Mi Psicólogo virtual" to="/Chat" />
          </div>
          <div className="flex flex-row gap-8">
            <OptionCard color="purple" title="Ayuda profesional" to="/Chat" />
            <OptionCard color="green" title="Mi día a día" to="/Chat" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;

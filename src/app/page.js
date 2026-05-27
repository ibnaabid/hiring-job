import Image from "next/image";
import Hero from "./Hero/page";
import Company from "./Hero/Company";
import Alert from "./Hero/Alert";
// import Joblsit from "./Hero/Joblsit";
// import { Alert } from "@heroui/react";

export default function Home() {
  return (
   <>
   <Hero></Hero>
   <Company></Company>
   <Alert></Alert>
   {/* <Alert></Alert> */}
   {/* <Joblsit></Joblsit> */}

   
   </>
  );
}

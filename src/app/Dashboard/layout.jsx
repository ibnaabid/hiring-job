
import SideBar from "../SideLayout/page";


export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      <SideBar />
 

      <main className="flex-1 p-6 bg-slate-100">
           <div className="text-4xl text-red-800">
            
           </div>
        {children}
      </main>
    </div>
  );
}
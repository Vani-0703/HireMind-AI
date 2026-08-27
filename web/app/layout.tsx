import './globals.css';
import { Toaster } from 'sonner';
export const metadata={title:'HireMind AI — Talent Intelligence',description:'AI-powered recruitment and career intelligence platform'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}<Toaster richColors position="top-right"/></body></html>}

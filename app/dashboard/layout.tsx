import SideNav from '@/app/ui/dashboard/Sidenav';



export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col-2  max-w-screen-xl mx-auto" style={{ minBlockSize: 'calc(100vh - 80px)' }}>
         <div className="min-w-[200px]">
        <SideNav />
        </div>
      <div className="flex-grow p-6" style={{ minBlockSize: 'calc(100vh - 80px)' }}>{children}</div>
    </div>
  );
}
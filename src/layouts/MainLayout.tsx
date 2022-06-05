import Header from "./partials/Header";
import Sider from "./partials/Sider";

interface LayoutProps {
	children: React.ReactNode;
}

function MainLayout({ children }: LayoutProps): JSX.Element {
	return (
		<div className="h-screen w-screen bg-white flex flex-row">
      <Sider />
      <div className="flex-5 w-full h-full flex flex-col">
        <Header />
        <div className="overflow-auto flex-8 p-4">
          {children}
        </div>
      </div>
    </div>
	);
}

export default MainLayout;

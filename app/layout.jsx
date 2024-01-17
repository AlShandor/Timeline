import "@styles/globals.css";

import Nav from '@components/Nav';

export const metadata = {
    title: "Timeline",
    description: "Explore historical events and people with Timeline tool",
};

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <div className='background' />
                <main className="main">
                    <Nav />
                    {children}
                </main>
            </body>
        </html>
    )
};

export default RootLayout;
